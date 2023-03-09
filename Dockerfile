FROM node:18.14.0-alpine as builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

RUN cd apps/backend && npm run prisma:generate

FROM node:18.14.0-alpine as runner

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

COPY --from=builder /app/apps/backend /app
COPY --from=builder /app/apps/frontend/dist /app/dist/public
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/docker-entrypoint.sh /app/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
