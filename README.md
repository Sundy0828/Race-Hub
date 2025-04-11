# 🏁 Race Hub

Race Hub is a backend service for organizing, managing, and analyzing race event data. It supports uploading and querying participant results, race metadata, and more — built with Node.js, TypeScript, Express, GraphQL, and PostgreSQL.

## 🚀 Features

- Upload single or bulk race results
- REST and GraphQL APIs
- PostgreSQL for persistent storage
- Redis for caching (optional)
- Dockerized for easy deployment

## 🧱 Tech Stack

- Node.js
- Express
- TypeScript
- GraphQL (Apollo Server)
- PostgreSQL
- Redis
- Docker
- `pnpm` for dependency management

## 📦 Installation

Make sure you have `pnpm`, Docker, and PostgreSQL running locally.

```bash
# Install all dependencies
pnpm install

# Build the project
pnpm build

# Run the app
pnpm start
```

Or with Docker:

```bash
# Build the image
docker build -t race-hub-backend .

# Run the container
docker run -p 4000:4000 race-hub-backend
```

## 📬 API Endpoints

### REST

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| POST   | `/results`       | Upload single result      |
| POST   | `/results/bulk`  | Upload multiple results   |

### GraphQL

GraphQL endpoint available at:

```
/graphql
```

## 🛠 Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL=postgres://user:password@localhost:5432/racehub
REDIS_URL=redis://localhost:6379
PORT=4000
```

## 📄 License

MIT © Jerrod Sunderland
