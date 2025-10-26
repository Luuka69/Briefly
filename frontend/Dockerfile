# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS builder
WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY vite.config.ts index.html ./
COPY src src

RUN npm run build

FROM nginx:1.27-alpine AS runner

COPY frontend.nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
