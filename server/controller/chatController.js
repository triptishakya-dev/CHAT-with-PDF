import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import dotenv from "dotenv";

dotenv.config();

export const chatController = async (req, res) => {
  try {
    console.log(req.body); // Corrected line
    const { query } = req.body;
    console.log("User Query:", query);

    const embedding = new GoogleGenerativeAIEmbeddings({
      modelName: "models/embedding-001",
      apiKey: process.env.GEMINI_API_KEY,
    });

    console.log("🔹 Connecting to Qdrant at:", process.env.QDRANT_URL);
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embedding,
      {
        url: process.env.QDRANT_URL,
        collectionName: "pdf-embedding",
      }
    );

    const retriever = vectorStore.asRetriever({ k: 2 });
    console.log("🔹 Retriever created with top-k = 2");

    // ✅ Retrieve similar docs
    console.log("🔹 Performing similarity search...");
    const similaritySearchResults = await retriever.invoke(query);
    console.log(
      "📄 Similarity Search Results:",
      JSON.stringify(similaritySearchResults, null, 2)
    );




    const SYSTEM_PROMPT = `
      You are a helpful AI assistant. 
      Use the following context from a PDF to answer the user’s question and answer in 50 words atleast.
      
      Context: ${JSON.stringify(similaritySearchResults, null, 2)}
      
      User Question: ${query}
    `;

    // ✅ Call Gemini LLM
    console.log("🤖 Calling Gemini model...");
    const llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-1.5-flash",
      temperature: 0.7,
    });

    const data = await llm.invoke(SYSTEM_PROMPT);
    console.log("✅ Gemini response received.");

    const aiContent = data;

    return res.status(200).json({
      status: 200,
      message: "Query received successfully",
      data: { aiContent },
    });
  } catch (error) {
    console.error("Error in chatController:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
