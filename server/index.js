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
});8

const upload = multer({ storage: storage });
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ status: "all good" });
});

app.post("/upload/pdf", upload.single("pdf"), async (req, res) => {
  console.log("api is hit")
  await queue.add(
    "file-ready",
    JSON.stringify({
      destination: req.file.destination,
      path: req.file.path,
    })
  );
  return res.json({ message: "uploaded" });
});


app.post("/chat" , chatController)

app.listen(8000, () => console.log(`server started on PORT: ${8000}`));
