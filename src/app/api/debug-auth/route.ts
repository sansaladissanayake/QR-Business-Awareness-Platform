import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { auth } = await import('@clerk/nextjs/server');
    const authObj = await auth();
    return NextResponse.json({
      status: 'clerk_ok',
      userId: authObj?.userId ?? null,
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.slice(0, 20) + '...',
      secretKeySet: !!process.env.CLERK_SECRET_KEY,
      secretKeyPrefix: process.env.CLERK_SECRET_KEY?.slice(0, 10) + '...',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'clerk_error',
      message: error.message,
      name: error.name,
    }, { status: 500 });
  }
}
