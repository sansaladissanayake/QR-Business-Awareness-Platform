import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit2, QrCode } from 'lucide-react';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const businesses = await prisma.business.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">Your Profiles</h1>
        <Link 
          href="/register" 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create New
        </Link>
      </div>

      {businesses.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
            <QrCode className="w-8 h-8 text-white/50" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No profiles yet</h2>
          <p className="text-gray-400 mb-6">Create your first digital business profile to get started.</p>
          <Link 
            href="/register" 
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Create Profile
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <div key={business.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                  {business.logo ? (
                    <img src={business.logo} alt={business.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                      {business.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{business.name}</h3>
                  <p className="text-sm text-gray-400 truncate">{business.slug}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <Link 
                  href={`/${business.slug}`} 
                  className="flex-1 text-center py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-white transition-colors"
                >
                  View Live
                </Link>
                <Link 
                  href={`/dashboard/edit/${business.slug}`} 
                  className="flex items-center justify-center gap-1 flex-1 py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 rounded-lg text-sm font-medium transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Link>
                <Link 
                  href={`/${business.slug}/qr`} 
                  className="flex items-center justify-center w-10 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                  title="View QR"
                >
                  <QrCode className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
