import Link from "next/link";
import { QrCode, ArrowRight, Zap, Globe, Shield, User } from "lucide-react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
        <div className="text-xl font-bold flex items-center gap-2 tracking-tight">
          <QrCode className="w-6 h-6 text-indigo-400" />
          Scanly
        </div>
        <div>
          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/dashboard" signUpForceRedirectUrl="/dashboard">
              <button className="text-sm font-semibold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                Sign In
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
            </div>
          </Show>
        </div>
      </div>

      {/* Decorative background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl mix-blend-screen pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center mt-12">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
          <Zap className="w-3.5 h-3.5" />
          QR Business Awareness Platform
        </div>

        {/* Logo */}
        <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30 border border-white/10">
          <QrCode className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          One QR Code.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Endless Reach.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
          Create a stunning digital business profile in minutes. Connect all your social media, contact info, and location in one beautiful, mobile-friendly page — accessible with a single QR scan.
        </p>

        {/* Feature chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['Mobile Friendly', 'Permanent URL', 'QR Generated', 'Update Anytime', 'Free to Start'].map(f => (
            <span key={f} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
              ✓ {f}
            </span>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/dashboard" signUpForceRedirectUrl="/dashboard">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full overflow-hidden transition-all shadow-lg shadow-indigo-500/30">
                <span className="relative flex items-center gap-2">
                  Create Your Profile
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link 
              href="/dashboard"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full overflow-hidden transition-all shadow-lg shadow-indigo-500/30"
            >
              <span className="relative flex items-center gap-2">
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Show>
          <Link 
            href="/console-items-lk"
            className="group inline-flex items-center justify-center px-8 py-4 font-semibold text-white bg-white/10 backdrop-blur-sm rounded-full overflow-hidden transition-all hover:bg-white/15 border border-white/20"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              See Example Profile
            </span>
          </Link>
        </div>

        {/* Stats / proof */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
          {[
            { icon: <QrCode className="w-5 h-5" />, title: 'Permanent QR Code', desc: 'Never changes, even when you update your info.' },
            { icon: <Globe className="w-5 h-5" />, title: 'All Your Links', desc: 'Facebook, WhatsApp, Maps, and more — in one place.' },
            { icon: <Shield className="w-5 h-5" />, title: 'Always Online', desc: 'Your profile stays live as long as you need it.' },
          ].map(item => (
            <div key={item.title} className="p-5 rounded-2xl bg-white/3 border border-white/8 text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <h3 className="font-semibold text-white mb-1 text-sm">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
