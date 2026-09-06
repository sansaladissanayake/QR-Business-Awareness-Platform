import React from 'react';
import { MapPin, MessageCircle, Phone, Mail, Globe, ExternalLink, LucideIcon } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { Link } from '@/data/businesses';
import { cn } from '@/lib/utils';

interface LinkButtonProps {
  link: Link;
}

const iconMap: Record<string, React.ElementType> = {
  MapPin,
  Facebook: FaFacebook,
  MessageCircle,
  Phone,
  Mail,
  Instagram: FaInstagram,
  Globe,
  Youtube: FaYoutube,
  TikTok: FaTiktok,
};

export const LinkButton: React.FC<LinkButtonProps> = ({ link }) => {
  const Icon = iconMap[link.icon] || ExternalLink;
  let formattedUrl = link.url;
  if (link.icon === 'Phone' && !formattedUrl.startsWith('tel:')) {
    // Remove any spaces or dashes from the phone number
    formattedUrl = `tel:${formattedUrl.replace(/[\s-]/g, '')}`;
  } else if (link.icon === 'Mail' && !formattedUrl.startsWith('mailto:')) {
    formattedUrl = `mailto:${formattedUrl}`;
  } else if (link.icon === 'MessageCircle' && !formattedUrl.startsWith('http')) {
    // If it's just a number, prefix with wa.me
    formattedUrl = `https://wa.me/${formattedUrl.replace(/[\s+-]/g, '')}`;
  } else if (!formattedUrl.startsWith('http') && !formattedUrl.startsWith('tel:') && !formattedUrl.startsWith('mailto:')) {
    // Fallback for general website links if they forgot https://
    formattedUrl = `https://${formattedUrl}`;
  }

  const isAppIntent = formattedUrl.startsWith('tel:') || formattedUrl.startsWith('mailto:') || formattedUrl.startsWith('sms:');

  return (
    <a
      href={formattedUrl}
      {...(!isAppIntent ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative flex items-center w-full p-4 mb-4 rounded-xl",
        "bg-white/5 backdrop-blur-md border border-white/10",
        "hover:bg-white/10 hover:scale-[1.02] hover:border-white/20 transition-all duration-300 ease-out",
        "shadow-lg hover:shadow-xl overflow-hidden"
      )}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out z-0" />
      
      <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white mr-4 group-hover:bg-white/20 transition-colors duration-300">
        <Icon className="w-6 h-6" />
      </div>
      
      <div className="relative z-10 flex-1">
        <span className="text-base md:text-lg font-semibold text-white tracking-wide">
          {link.title}
        </span>
      </div>
    </a>
  );
};
