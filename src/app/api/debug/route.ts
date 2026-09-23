import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const business = await prisma.business.findFirst();
    return NextResponse.json({ status: 'success', data: business });
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: error.message, 
      stack: error.stack,
      name: error.name,
      code: error.code
    }, { status: 500 });
  }
}
