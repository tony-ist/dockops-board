#!/bin/sh

set -e

db_path="/etc/dockops-board/db/production.db"

if [ ! -f "$db_path" ]; then
  cp "prisma/production_empty.db" "$db_path"
fi

npm run db:migrate
node dist/index.js
