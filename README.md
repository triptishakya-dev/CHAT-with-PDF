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

## Architecture

This application implements a Retrieval-Augmented Generation (RAG) pattern:

- Ingestion: Uploaded PDFs are parsed and chunked into passages.
- Vectorization: Passages are converted to embeddings and stored in a vector database (e.g., Qdrant).
- Retrieval: At query time, relevant passages are retrieved by vector similarity.
- Generation: Retrieved context is fed to a language model to produce concise, source-grounded answers.

The system is organized into a web frontend (`client`), an API server (`server`), and background workers for ingestion and vectorization.

## Project structure

- `client/` — Next.js frontend (app router), authentication, UI components.
- `server/` — Express/Node API, upload endpoints, worker orchestration.
- `controller/` — High-level request handlers used by the server and workers.
- `uploads/` — Temporary storage for uploaded PDFs (can be backed by persistent storage in production).
- `docker-compose.yml` — Optional local orchestration for services (vector DB, server, worker, etc.).

## Environment variables

Create `.env` files for `client` and `server`. Typical variables:

- For `client` (Next.js):
	- `NEXT_PUBLIC_API_URL` — URL of the backend API (e.g., `http://localhost:8080`).
	- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk public key for auth (if using Clerk).

- For `server`:
	- `PORT` — Server port (e.g., `8080`).
	- `CLERK_SECRET_KEY` — Clerk secret key (if using Clerk server-side features).
	- `VECTOR_DB_URL` — Connection URL for the vector database (Qdrant endpoint).
	- `OPENAI_API_KEY` (or other LLM provider key) — Key for calling the language model.
	- `REDIS_URL` — Redis endpoint for BullMQ if used.

Store secrets securely for production (Secrets Manager, environment, or CI variables).

## Running locally (expanded)

1. Install dependencies for `client` and `server`:

```bash
# from repository root
cd client
npm install
cd ../server
npm install
```

2. Start services (example):

```bash
# start backend
cd server
node index.js

# start frontend
cd ../client
npm run dev
```

3. Optional: start vector DB and Redis with `docker-compose up` if `docker-compose.yml` is configured.

## Deployment notes

- Use the included `docker-compose.yml` for simple deployments of the API, worker, and vector DB.
- For production, deploy the `client` (Next.js) to Vercel or a static host and the `server` to a container service (AWS ECS, DigitalOcean App Platform, etc.).
- Ensure environment variables and secrets are set in your hosting platform.

## Testing

- Add unit and integration tests for the backend API and ingestion worker as you expand features.
- For frontend, use React Testing Library and Playwright or Cypress for end-to-end flows.

## Troubleshooting

- If uploads fail, confirm `uploads/` folder permissions and that `server` accepts large request bodies.
- If retrieval returns poor results, check embedding generation, chunk size, and the vector DB indexing settings.

## Contact

If you have questions or want help extending this project, open an issue or reach out in the repository.


