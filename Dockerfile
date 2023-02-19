FROM node:18.14.1-alpine

WORKDIR /app

RUN npm install -g turbo
COPY . .
RUN turbo prune

COPY package.json ./
COPY package-lock.json ./

COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY packages/frontend/package.json ./apps/frontend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json

RUN npm ci --production
RUN npm run build

# Copy app source
COPY . .

EXPOSE 8080

CMD [ "node", "apps/docs/server.js" ]