# Install dependencies only when needed
FROM oven/bun:1.1.8-alpine as deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
WORKDIR /var/www
COPY package.json bun.lockb ./
RUN bun i

# Rebuild the source code only when needed
FROM node:18-alpine3.18 AS builder
WORKDIR /var/www
COPY . .
COPY --from=deps /var/www/node_modules ./node_modules
RUN yarn build
# && yarn install --production --ignore-scripts --prefer-offline

FROM nginx:latest

COPY --from=builder /var/www/public /usr/share/nginx/html/public
COPY --from=builder /var/www/dist/ /usr/share/nginx/html
# COPY nginx.conf /etc/nginx

EXPOSE 3000
