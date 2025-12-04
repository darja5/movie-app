# build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV NEXT_PUBLIC_TMDB_KEY=6e860490c3e2eb1af145c7f0aaaae174
ENV TMDB_API_KEY=6e860490c3e2eb1af145c7f0aaaae174
RUN npm run build

# production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

ENV NEXT_PUBLIC_TMDB_KEY=6e860490c3e2eb1af145c7f0aaaae174
ENV TMDB_API_KEY=6e860490c3e2eb1af145c7f0aaaae174

EXPOSE 3000

CMD ["npm", "start"]