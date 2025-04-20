# Step 1: Build the app
FROM node:slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Run the production app
FROM node:slim
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
