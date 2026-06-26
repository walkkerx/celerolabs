#!/bin/bash
# Production build script — swaps Prisma schema to PostgreSQL before building
set -e

echo "Switching to PostgreSQL schema for production..."
cp prisma/schema.prisma prisma/schema.dev.bak.prisma
cp prisma/schema.postgres.prisma prisma/schema.prisma

echo "Generating Prisma client for PostgreSQL..."
npx prisma generate

echo "Building Next.js..."
next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/

echo "Restoring dev schema..."
mv prisma/schema.dev.bak.prisma prisma/schema.prisma

echo "Production build complete with PostgreSQL schema"
