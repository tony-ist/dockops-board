# Dockops Board

## What is this?

This is an open source docker dashboard with web UI.
It allows you to create and configure new services from GitHub repo or from Docker image.
It also allows you to monitor these services, manipulate them, see logs and so on.

## Requirements

- SQLite 3

## Development

Create DB

```bash
sqlite3 apps/backend/prisma/local.db
.databases
.exit
```

Start the app

```bash
cp apps/frontend/.env.template apps/frontend/.env.local # And edit the .env file
cp apps/backend/.env.template apps/backend/.env.local # And edit the .env file
npm install
npm run hooks:install
npm run dev
```

## Build

```bash
npm run build
```

## Design document

https://docs.google.com/document/d/1djPd8sRh4rnxgAiJo4fiCWoEEfWvoEshMunfDMTiLag/edit?usp=sharing
