import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();
    const { name, description, logo, links } = body;

    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }

    // Verify ownership
    const existing = await prisma.business.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    if (existing.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const business = await prisma.business.update({
      where: { slug },
      data: {
        name: name.trim(),
        description: description.trim(),
        logo: logo?.trim() || '',
        links: {
          deleteMany: {}, // Clear old links
          create: (links || []).map((link: { platform: string; title: string; url: string }, index: number) => ({
            platform: link.platform,
            title: link.title,
            url: link.url,
            order: index,
          })),
        },
      },
      include: { links: { orderBy: { order: 'asc' } } },
    });

    return NextResponse.json(business);
  } catch (error) {
    console.error('Error updating business:', error);
    return NextResponse.json({ error: 'Failed to update business' }, { status: 500 });
  }
}
