import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProfileHeader } from '@/components/ProfileHeader';
import { LinkButton } from '@/components/LinkButton';
import { QRCodeDisplay } from '@/components/QRCodeDisplay';
import { Business, Link as BusinessLink } from '@/data/businesses';

interface ProfilePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ qr?: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { slug } = await params;
  const business = await prisma.business.findUnique({ where: { slug } });
  if (!business) return { title: 'Not Found' };
  return {
    title: `${business.name} | Scanly`,
    description: business.description,
  };
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  const { slug } = await params;
  const { qr } = await searchParams;

  const businessData = await prisma.business.findUnique({
    where: { slug },
    include: { links: { orderBy: { order: 'asc' } } },
  });

  if (!businessData) {
    notFound();
  }

  // Map DB data to the shape expected by components
  const business: Business = {
    id: businessData.id,
    slug: businessData.slug,
    name: businessData.name,
    description: businessData.description,
    logo: businessData.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(businessData.name)}&background=101010&color=fff&size=200`,
    links: businessData.links.map((l): BusinessLink => ({
      id: l.id,
      title: l.title,
      url: l.url,
      icon: platformToIcon(l.platform),
    })),
  };

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const profileUrl = `${baseUrl}/${slug}`;
  const showQR = qr === '1';

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-md mx-auto">
        <ProfileHeader business={business} />
        
        <div className="mt-6 flex flex-col items-center w-full">
          {business.links.map((link) => (
            <LinkButton key={link.id} link={link} />
          ))}
        </div>

        {showQR && (
          <div className="mt-12 flex flex-col items-center">
            <h2 className="text-lg font-semibold text-white mb-6">Your QR Code</h2>
            <QRCodeDisplay url={profileUrl} businessName={business.name} />
          </div>
        )}
        
        {!showQR && (
          <div className="mt-10 text-center">
            <a
              href={`/${slug}?qr=1`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors border border-white/10"
            >
              📲 View QR Code
            </a>
          </div>
        )}
        
        <footer className="mt-16 text-center text-sm text-white/30">
          <p>Powered by <span className="text-indigo-400 font-medium">Scanly</span></p>
        </footer>
      </div>
    </main>
  );
}

function platformToIcon(platform: string): string {
  const map: Record<string, string> = {
    maps: 'MapPin',
    facebook: 'Facebook',
    instagram: 'Instagram',
    whatsapp: 'MessageCircle',
    phone: 'Phone',
    email: 'Mail',
    website: 'Globe',
    youtube: 'Youtube',
    tiktok: 'TikTok',
  };
  return map[platform] ?? 'Globe';
}
