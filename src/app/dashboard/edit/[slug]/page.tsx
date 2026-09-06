import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { EditBusinessForm } from '@/components/EditBusinessForm';

export default async function EditBusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const { slug } = await params;
  const business = await prisma.business.findUnique({
    where: { slug },
    include: { links: { orderBy: { order: 'asc' } } }
  });

  if (!business) {
    notFound();
  }

  // Ensure only the owner can edit
  if (business.userId !== userId) {
    redirect('/dashboard');
  }

  const initialData = {
    slug: business.slug,
    name: business.name,
    description: business.description,
    logo: business.logo,
    links: business.links.map(link => ({
      platform: link.platform,
      title: link.title,
      url: link.url
    }))
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Edit Profile</h1>
          <p className="text-gray-400">Update your business information and links.</p>
        </div>
        
        <EditBusinessForm initialData={initialData} />
      </div>
    </main>
  );
}
