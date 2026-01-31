import express, { json } from "express";
import cors from "cors";
import multer from "multer";
import { Queue } from "bullmq";
import { chatController } from "./controller/chatController.js";

const queue = new Queue("file-upload-queue", {
  connection: {
    host: "localhost",
    port: "6379",
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
}); 8

const upload = multer({ storage: storage });
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ status: "all good" });
});

app.post("/upload/pdf", upload.single("pdf"), async (req, res) => {
  console.log("--- API HIT: POST /upload/pdf ---");

  if (!req.file) {
    console.error("ERROR: No file received in req.file");
    return res.status(400).json({ message: "No file uploaded" });
  }

  console.log("File uploaded successfully:");
  console.log(" - Original Name:", req.file.originalname);
  console.log(" - Destination:", req.file.destination);
  console.log(" - Path:", req.file.path);

  try {
    console.log("Adding job to 'file-ready' queue...");
    await queue.add(
      "file-ready",
      JSON.stringify({
        destination: req.file.destination,
        path: req.file.path,
      })
    );
    console.log("Job successfully added to queue.");
    return res.json({ message: "uploaded" });
  } catch (error) {
    console.error("ERROR while adding to queue:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post("/chat", chatController)

app.listen(8000, () => console.log(`server started on PORT: ${8000}`));
