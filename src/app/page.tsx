import Link from "next/link";
import { QrCode, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl mix-blend-screen" />

      <div className="relative z-10 max-w-3xl flex flex-col items-center">
        <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/20 border border-white/10">
          <QrCode className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          One QR Code. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Endless Possibilities.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
          Create a stunning digital profile for your business. Connect all your links, social media, and location in one beautiful, mobile-friendly landing page.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link 
            href="/console-items-lk"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-white/10 backdrop-blur-sm rounded-full overflow-hidden transition-all hover:bg-white/20 border border-white/20"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center gap-2">
              View Example Profile
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
