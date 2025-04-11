FROM node:18

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /

# Copy only dependency files first
COPY package.json ./

# Install dependencies and cache node_modules layer
RUN pnpm install

# Copy the rest of the app
COPY . .

# Build the app
RUN pnpm run build

EXPOSE 4000

CMD ["pnpm", "start"]
