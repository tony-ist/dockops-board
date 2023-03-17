import { describe, it, expect } from 'vitest';
import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import '../../config'

describe('docker-sync', () => {
  it('should', async () => {
    console.log(process.env.SQLITE_URL)
    // console.log(config.sqliteURL)
    const fastify = Fastify()
    const prisma = new PrismaClient();
    await prisma.$connect();
    const containers = await prisma.container.findMany();
    console.log(containers)
    expect(true).toBe(true)
  })
})