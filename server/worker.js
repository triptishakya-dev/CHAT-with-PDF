import { Worker } from "bullmq";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { QdrantVectorStore } from "@langchain/qdrant";

dotenv.config();

// ✅ Fail fast if required env vars are missing
["GOOGLE_API_KEY", "QDRANT_URL"].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});
const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    console.log(`📦 Received job:`, job.data);

    try {
      const jobData =
        typeof job.data === "string" ? JSON.parse(job.data) : job.data;

      // ✅ Validate path before using trim()
      if (!jobData.path || typeof jobData.path !== "string") {
        throw new Error("Invalid or missing file path in job data");
      }

      const cleanPath = path.resolve(jobData.path.trim());

      if (!fs.existsSync(cleanPath)) {
        throw new Error(`File does not exist: ${cleanPath}`);
      }

      console.log("📄 Loading PDF from:", cleanPath);
      const loader = new PDFLoader(cleanPath);
      const docs = await loader.load();

      console.log(`✅ Loaded ${docs.length} document(s) from PDF`);

      // ✅ Correct Gemini embedding model
      const embeddings = new GoogleGenerativeAIEmbeddings({
        modelName: "models/embedding-001",
        apiKey: process.env.GOOGLE_API_KEY,
      });

      console.log("⚙️ Storing documents & embeddings in Qdrant...");
      const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
          url: process.env.QDRANT_URL,
          collectionName: "pdf_embeddings",
        }
      );

      // ✅ Batch processing with delay to respect rate limits
      const BATCH_SIZE = 5; // Process 5 pages at a time
      const DELAY_MS = 3000; // Wait 3 seconds between batches (approx 20 RPM max if just embedding)

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      for (let i = 0; i < docs.length; i += BATCH_SIZE) {
        const batch = docs.slice(i, i + BATCH_SIZE);
        console.log(
          `⏳ Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(
            docs.length / BATCH_SIZE
          )} (${batch.length} docs)...`
        );

        await vectorStore.addDocuments(batch);

        if (i + BATCH_SIZE < docs.length) {
          console.log(`Waiting ${DELAY_MS}ms to respect rate limits...`);
          await delay(DELAY_MS);
        }
      }

      console.log(`✅ Successfully stored ${docs.length} documents in Qdrant`);
    } catch (error) {
      console.error("❌ Error processing job:", error);
    }
  },
  {
    concurrency: 1, // Only process one file at a time
    connection: {
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT) || 6379,
    },
  }
);

console.log("📥 Worker started and waiting for jobs...");
