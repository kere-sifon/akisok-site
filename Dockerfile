# syntax=docker/dockerfile:1.7
# Build for the cluster (x86_64) from an Apple Silicon Mac:
#   docker buildx build --platform linux/amd64 \
#     --build-arg CLOUDINARY_CLOUD_NAME=... \
#     --build-arg CLOUDINARY_API_KEY=... \
#     --build-arg CLOUDINARY_API_SECRET=... \
#     -t nexus-lan.keresifon.com/docker-hosted/akisok-site:<tag> --push .

FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_OPTIONS=--max-old-space-size=4096
# Photos resolve during `next build` (`lib/images.ts`). Missing values fall back
# to local placeholders; pass the real Cloudinary trio for production images.
ARG CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME \
    CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY \
    CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET
RUN npm run build \
 && test -f .next/standalone/server.js

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/content ./content
USER 1001
EXPOSE 3000
CMD ["node", "server.js"]
