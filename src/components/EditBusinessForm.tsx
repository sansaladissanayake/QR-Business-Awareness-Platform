'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Phone, Mail, Globe, MapPin, MessageCircle, X } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { cn } from '@/lib/utils';

type Platform = {
  id: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  prefix: string;
};

const PLATFORMS: Platform[] = [
  { id: 'maps', label: 'Google Maps', icon: <MapPin className="w-4 h-4" />, placeholder: 'Paste Google Maps link...', prefix: 'https://' },
  { id: 'facebook', label: 'Facebook', icon: <FaFacebook className="w-4 h-4" />, placeholder: 'https://facebook.com/yourpage', prefix: 'https://facebook.com/' },
  { id: 'instagram', label: 'Instagram', icon: <FaInstagram className="w-4 h-4" />, placeholder: 'https://instagram.com/yourhandle', prefix: 'https://instagram.com/' },
  { id: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle className="w-4 h-4" />, placeholder: 'https://wa.me/94XXXXXXXXX', prefix: 'https://wa.me/' },
  { id: 'phone', label: 'Phone / Call', icon: <Phone className="w-4 h-4" />, placeholder: 'tel:+94XXXXXXXXX', prefix: 'tel:' },
  { id: 'email', label: 'Email', icon: <Mail className="w-4 h-4" />, placeholder: 'mailto:you@example.com', prefix: 'mailto:' },
  { id: 'website', label: 'Website', icon: <Globe className="w-4 h-4" />, placeholder: 'https://yourwebsite.com', prefix: 'https://' },
  { id: 'youtube', label: 'YouTube', icon: <FaYoutube className="w-4 h-4" />, placeholder: 'https://youtube.com/@yourchannel', prefix: 'https://youtube.com/' },
  { id: 'tiktok', label: 'TikTok', icon: <FaTiktok className="w-4 h-4" />, placeholder: 'https://tiktok.com/@yourhandle', prefix: 'https://tiktok.com/' },
];

type LinkEntry = {
  platform: string;
  title: string;
  url: string;
};

type SubmitResult = {
  slug: string;
  name: string;
};

type EditBusinessFormProps = {
  initialData: {
    slug: string;
    name: string;
    description: string;
    logo: string | null;
    links: { platform: string; title: string; url: string }[];
  }
};

export const EditBusinessForm: React.FC<EditBusinessFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);
  const [logo, setLogo] = useState(initialData.logo || '');
  const [links, setLinks] = useState<LinkEntry[]>(initialData.links);
  const [showPlatformPicker, setShowPlatformPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SubmitResult | null>(null);

  const addLink = (platform: Platform) => {
    setLinks(prev => [...prev, { platform: platform.id, title: platform.label, url: '' }]);
    setShowPlatformPicker(false);
  };

  const updateLink = (index: number, field: keyof LinkEntry, value: string) => {
    setLinks(prev => prev.map((l, i) => i === index ? { ...l, [field]: value } : l));
  };

  const removeLink = (index: number) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };

  const getPlatform = (id: string) => PLATFORMS.find(p => p.id === id);

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) {
      setError('Business name and description are required.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch(`/api/businesses/${initialData.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, logo, links }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update business');
      }
      const data: SubmitResult = await res.json();
      setResult(data);
      setStep(3);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 3 && result) {
    return (
      <div className="flex flex-col items-center text-center space-y-6 py-8">
        <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-4xl">
          🎉
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{result.name} Updated!</h2>
          <p className="text-gray-400">Your business profile has been updated successfully.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
          <button
            onClick={() => router.push(`/${result.slug}`)}
            className="flex-1 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
          >
            View Profile
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="flex-1 py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2].map(s => (
          <React.Fragment key={s}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
              step >= s ? "bg-indigo-600 text-white" : "bg-white/10 text-gray-400"
            )}>
              {s}
            </div>
            {s < 2 && <div className={cn("flex-1 h-0.5 transition-all", step > s ? "bg-indigo-600" : "bg-white/10")} />}
          </React.Fragment>
        ))}
        <span className="text-xs text-gray-400 ml-2">{step === 1 ? 'Business Info' : 'Social Links'}</span>
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Business Name *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Console Items LK"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Short Description *</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What does your business do? (1–2 sentences)"
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Logo URL <span className="text-gray-500">(optional)</span></label>
            <input
              type="url"
              value={logo}
              onChange={e => setLogo(e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
            {logo && (
              <div className="mt-3 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo} alt="Logo preview" className="w-14 h-14 rounded-full object-cover border border-white/20" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <span className="text-xs text-gray-400">Logo preview</span>
              </div>
            )}
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            onClick={() => { if (!name.trim() || !description.trim()) { setError('Name and description are required.'); return; } setError(''); setStep(2); }}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
          >
            Next: Add Links →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          {links.length === 0 && (
            <p className="text-center text-gray-500 py-4 text-sm">No links added yet. Click below to add your social media links.</p>
          )}
          {links.map((link, index) => {
            const platform = getPlatform(link.platform);
            return (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  {platform?.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-400 mb-1">{platform?.label}</p>
                  <input
                    type="text"
                    value={link.url}
                    onChange={e => updateLink(index, 'url', e.target.value)}
                    placeholder={platform?.placeholder}
                    className="w-full bg-transparent text-white text-sm placeholder-gray-600 focus:outline-none"
                  />
                </div>
                <button onClick={() => removeLink(index)} className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          {/* Platform Picker */}
          {showPlatformPicker ? (
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-300">Select a platform</span>
                <button onClick={() => setShowPlatformPicker(false)} className="text-gray-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {PLATFORMS.filter(p => !links.find(l => l.platform === p.id)).map(platform => (
                  <button
                    key={platform.id}
                    onClick={() => addLink(platform)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-gray-300 hover:text-white transition-all"
                  >
                    <span className="text-indigo-400">{platform.icon}</span>
                    {platform.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowPlatformPicker(true)}
              className="w-full py-3 rounded-xl border border-dashed border-white/20 text-gray-400 hover:border-indigo-500 hover:text-indigo-400 transition-all flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add a Link
            </button>
          )}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors"
            >
              {isSubmitting ? 'Updating...' : '💾 Update Profile'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
