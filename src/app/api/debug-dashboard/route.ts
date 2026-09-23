import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = await auth();
    
    const testUserId = userId || "user_3IwqCnPcpjitQKHLe8jMHn2rVbG";

    const businesses = await prisma.business.findMany({
      where: { userId: testUserId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ 
      status: 'success', 
      userId,
      businessCount: businesses.length,
      businesses: businesses.map(b => ({ id: b.id, name: b.name, slug: b.slug }))
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
      name: error.name,
      code: error.code,
    }, { status: 500 });
  }
}
