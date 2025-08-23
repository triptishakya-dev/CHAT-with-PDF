import { Worker } from "bullmq";
import { QdrantVectorStore } from "@langchain/qdrant";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    const data = JSON.parse(job.data);

    const loader = new PDFLoader(data.path);
    const docs = await loader.load();

    console.log("embedding started");

    // Embedding Banana hai
    const embedding = new GoogleGenerativeAIEmbeddings({
      modelName: "models/embedding-001",
      apiKey: process.env.GEMINI_API_KEY,
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embedding,
      {
        url: process.env.QDRANT_URL,
        collectionName: "pdf-embedding",
      }
    );

    await vectorStore.addDocuments(docs);

    console.log("successfully stored in qdrantdb");
  },
  {
    concurrency: 100,
    connection: {
      host: "localhost",
      port: "6379",
    },
  }
);
