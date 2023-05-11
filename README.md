# Dockops Board

## What is this?

This is an open source docker dashboard with web UI.  
It allows you to create and configure new services from GitHub repo or from Docker image.  
It also allows you to monitor these services, manipulate them, see logs, execute interactive shell and so on.

## Requirements

- Node 18.14.0 via [nvm](https://github.com/nvm-sh/nvm)
- Java 11.0.17
- Preferably Ubuntu Linux 22.04 or macOS Ventura, WSL2 works too but worse

## Development

Install dependencies

```bash
nvm install 18.14.0
sudo apt install default-jre
```

Edit configs

```bash
cp apps/frontend/.env.template apps/frontend/.env.local
cp apps/backend/.env.template apps/backend/.env.local
```

And edit the `.env.local` files

Install dependencies

```bash
npm install
npm run hooks:install
```

Generate prisma typings

```bash
npm run prisma:generate -w=apps/backend
```

Create and seed DB

```bash
npm run db:push -w=apps/backend
npm run db:seed -w=apps/backend
```

Start the app

```bash
npm run dev
```

## Creating migration or applying migrations

```bash
npm run db:migrate
```

## Build

```bash
npm run build
```

## Design document

https://docs.google.com/document/d/1djPd8sRh4rnxgAiJo4fiCWoEEfWvoEshMunfDMTiLag/edit?usp=sharing
