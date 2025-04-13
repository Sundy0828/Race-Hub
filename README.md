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

Make sure you have `pnpm` and Docker running locally.

### 📦 Dependency Versions

This project is built and tested against the following versions:

| Dependency | Version |
| ---------- | ------- |
| Node.js    | 20.11.1 |
| npm        | 10.9.0  |
| pnpm       | 9.12.3  |
| GraphQL    | 16.10.0 |

> 💡 You can check these versions using:
>
> ```bash
> node -v
> npm -v
> pnpm -v
> ```

### Running Services

```bash
# Run backend
pnpm start:docker

# Run the web
pnpm start:web

# Run all
pnpm start
```

## 📬 API Endpoints

### REST

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| POST   | `/results`      | Upload single result    |
| POST   | `/results/bulk` | Upload multiple results |

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
