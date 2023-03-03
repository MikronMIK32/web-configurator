# Install dependencies only when needed
FROM node:16.13.0-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /var/www
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16.13.0-alpine AS builder
WORKDIR /var/www
COPY . .
COPY --from=deps /var/www/node_modules ./node_modules
RUN yarn build
# && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:16.13.0-alpine AS runner
WORKDIR /var/www

ENV NODE_ENV production

COPY --from=builder /var/www/public ./public
COPY --from=builder /var/www/dist ./dist
COPY --from=builder /var/www/package.json ./package.json

# 2. Развертываем приложение Angular на NGINX
FROM nginx:alpine

# Заменяем дефолтную страницу nginx соответствующей веб-приложению
RUN rm -rf /usr/share/nginx/html/*
COPY --from=runner /var/www/dist/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]