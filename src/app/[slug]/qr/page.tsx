import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { QRCodeDisplay } from '@/components/QRCodeDisplay';

export default async function QRAdminPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = await prisma.business.findUnique({ where: { slug } });

  if (!business) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL 
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` 
    : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'));
    
  const profileUrl = `${baseUrl}/${slug}`;

  return (
    <main className="min-h-screen py-12 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl text-center">
        <h1 className="text-2xl font-bold text-white mb-2">QR Code for {business.name}</h1>
        <p className="text-sm text-gray-300 mb-8">Print this out or save it to your phone.</p>
        
        <QRCodeDisplay url={profileUrl} businessName={business.name} />
        
        <div className="mt-8">
          <a
            href={`/${slug}`}
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            ← Back to Public Profile
          </a>
        </div>
      </div>
    </main>
  );
}
