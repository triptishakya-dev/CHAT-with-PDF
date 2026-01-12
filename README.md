# Chat with PDF

A web application that lets users upload PDF documents and interact with them through an AI-powered chat interface. Instead of manually scanning pages, users ask natural-language questions and receive instant, context-aware answers derived from the uploaded documents.

## About this project

This project demonstrates a Retrieval-Augmented Generation (RAG) workflow for document question-answering. PDFs are uploaded, processed into retrievable vectors, and stored in a vector database. When a user asks a question, the system retrieves relevant passages and feeds them to a language model to produce accurate, source-grounded responses.

Use cases:
- Quickly find answers in long reports, manuals, or research papers
- Build searchable knowledge bases from company documents
- Prototype document-aware chat assistants

## Features

- Upload and index PDF documents
- Natural-language Q&A across uploaded documents
- Source-aware answers with referenced passages
- Authentication and user sessions
- Scalable workers for ingestion and vectorization

## Tech Stack

- Frontend: Next.js (app router), React
- Auth: Clerk
- Worker/Queue: BullMQ
- Vector DB: Qdrant (or similar)
- AI: LLM + vector retrieval (RAG pattern)
- Containerization: Docker (optional)

## Quickstart (development)

1. Install dependencies for `client` and `server`:

```bash
# from repository root
cd client
npm install
cd ../server
npm install
```

2. Start development servers (run in separate terminals):

```bash
# client
cd client
npm run dev

# server
cd server
node index.js
```

3. Open the app in your browser at `http://localhost:3000` (Next.js default).

## Contributing

Contributions welcome — open an issue or PR with improvements or bug fixes.

## License

This project doesn't include a license file. Add one if you plan to publish.


