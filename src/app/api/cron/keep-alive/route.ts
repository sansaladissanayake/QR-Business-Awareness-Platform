import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// This endpoint is hit by Vercel Cron to keep the Supabase database awake
export async function GET(request: Request) {
  // Verify that the request is coming from Vercel Cron (Optional but recommended)
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Perform a lightweight query to wake up / keep the DB alive
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'ok', message: 'Database is awake' });
  } catch (error) {
    console.error('Keep-alive cron failed:', error);
    return NextResponse.json({ error: 'Failed to wake database' }, { status: 500 });
  }
}
