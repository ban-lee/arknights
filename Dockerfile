# https://docs.docker.com/samples/library/node/
ARG NODE_VERSION=19

FROM node:${NODE_VERSION}-alpine as deps
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN yarn set version 3.5.0
COPY /.yarnrc.yml package.json yarn.lock ./

RUN yarn install --immutable

# Rebuild the source code only when needed
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn up-types && yarn build && yarn cache clean

# Production image, copy all the files and run next
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]
