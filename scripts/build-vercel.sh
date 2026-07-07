#!/bin/bash
# Vercel build script — swaps to PostgreSQL, creates tables, builds, restores
set -e

echo "=== Vercel Production Build ==="

# 1. Swap to PostgreSQL schema
echo "→ Switching to PostgreSQL schema..."
cp prisma/schema.prisma prisma/schema.dev.bak.prisma
cp prisma/schema.postgres.prisma prisma/schema.prisma

# 2. Generate Prisma client for PostgreSQL
echo "→ Generating Prisma client..."
npx prisma generate

# 3. Push schema to create tables on the database (Neon)
echo "→ Creating database tables..."
npx prisma db push --accept-data-loss 2>&1 || echo "WARNING: db push failed (tables may already exist)"

# 4. Build Next.js
echo "→ Building Next.js..."
next build

# 5. Restore dev schema (so local dev still works)
echo "→ Restoring dev schema..."
mv prisma/schema.dev.bak.prisma prisma/schema.prisma

echo "=== Build complete ==="
