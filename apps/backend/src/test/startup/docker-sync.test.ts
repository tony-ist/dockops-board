import { describe, it, expect } from 'vitest';
import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { dockerSync } from '../../startup/docker-sync';

dotenv.config({ path: '.env.test'})

describe('docker-sync', () => {
  it('should', async () => {
    const fastify = Fastify()
    const prisma = new PrismaClient();
    await prisma.$connect();
    const containers = await prisma.container.findMany();
    console.log(containers)



    await dockerSync(fastify)

    expect(true).toBe(true)
  })
})