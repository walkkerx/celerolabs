import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'

// Resolve the database path from the DATABASE_URL env var.
// Default to a relative path that works both locally and on serverless.
function getDbPath(): string {
  const url = process.env.DATABASE_URL || 'file:./db/custom.db'
  // Extract path from "file:..." format
  if (url.startsWith('file:')) {
    return url.slice(5)
  }
  return url
}

function ensureDbExists() {
  const dbPath = getDbPath()
  const absPath = resolve(process.cwd(), dbPath)
  const dir = dirname(absPath)

  // Create the directory if it doesn't exist
  if (!existsSync(dir)) {
    try { mkdirSync(dir, { recursive: true }) } catch {}
  }

  // If the DB file doesn't exist, push the schema to create it
  if (!existsSync(absPath)) {
    try {
      execSync('npx prisma db push --skip-generate', {
        stdio: 'pipe',
        cwd: process.cwd(),
        env: { ...process.env },
      })
    } catch (e) {
      // Silent fail — the first query will create tables if possible
      console.warn('[db] Could not auto-create database:', e)
    }
  }
}

// Ensure DB exists before creating the client (only in production/serverless)
if (process.env.NODE_ENV === 'production') {
  try { ensureDbExists() } catch {}
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db