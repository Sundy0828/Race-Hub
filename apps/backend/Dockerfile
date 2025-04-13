# Use specific Node.js version as base
FROM node:20.11.1

# Set working directory
WORKDIR /app

# Upgrade npm to 10.9.0
RUN npm install -g npm@10.9.0

# Install specific pnpm version
RUN npm install -g pnpm@9.12.3

# Copy package manager files first (better Docker caching)
COPY package.json ./

# Install dependencies
RUN pnpm install

# Copy remaining app files
COPY . .

# Build the app
RUN pnpm run build

# Expose desired port (adjust as needed)
EXPOSE 4000

# Start the app
CMD ["pnpm", "start"]
