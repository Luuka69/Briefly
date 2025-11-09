# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS builder
WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./
RUN npm ci

COPY tsconfig.json tsconfig.json
COPY src src
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist dist

EXPOSE 4000

CMD ["npm", "run", "start"]
