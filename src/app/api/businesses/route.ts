import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper to generate a slug from a business name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function GET() {
  try {
    const businesses = await prisma.business.findMany({
      include: { links: { orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return NextResponse.json({ error: 'Failed to fetch businesses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, logo, links } = body;

    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }

    // Generate a unique slug
    let baseSlug = generateSlug(name);
    let slug = baseSlug;
    let counter = 1;

    // Check if slug already exists and append number if needed
    while (await prisma.business.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const business = await prisma.business.create({
      data: {
        name: name.trim(),
        slug,
        description: description.trim(),
        logo: logo?.trim() || '',
        links: {
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

    return NextResponse.json(business, { status: 201 });
  } catch (error) {
    console.error('Error creating business:', error);
    return NextResponse.json({ error: 'Failed to create business' }, { status: 500 });
  }
}
