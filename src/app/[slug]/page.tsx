import { notFound } from 'next/navigation';
import { getBusinessBySlug } from '@/data/businesses';
import { ProfileHeader } from '@/components/ProfileHeader';
import { LinkButton } from '@/components/LinkButton';

interface ProfilePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-md mx-auto">
        <ProfileHeader business={business} />
        
        <div className="mt-8 flex flex-col items-center w-full">
          {business.links.map((link) => (
            <LinkButton key={link.id} link={link} />
          ))}
        </div>
        
        <footer className="mt-16 text-center text-sm text-white/40">
          <p>Powered by Scanly</p>
        </footer>
      </div>
    </main>
  );
}
