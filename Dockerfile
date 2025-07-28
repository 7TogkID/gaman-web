# 1. Build stage
FROM node:20-alpine AS builder

RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build Next.js and generate Gaman key
RUN npm run build && \
    npx gaman key:generate

# 2. Production stage
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files from build stage
COPY --from=builder /app ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
