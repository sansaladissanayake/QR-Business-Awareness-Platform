import { RegistrationForm } from '@/components/RegistrationForm';
import { QrCode } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Create Your Business Profile | Scanly',
  description: 'Register your business and get a permanent QR code and digital profile page in minutes.',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen py-12 px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm mb-6 transition-colors">
            ← Back to home
          </Link>
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/20">
              <QrCode className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Register Your Business</h1>
          <p className="text-gray-400 text-sm">Fill in the details below. Your profile and QR code will be ready instantly.</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 md:p-8 shadow-2xl">
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}
