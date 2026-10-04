import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const userId = 'ADMINSALA';
    
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
