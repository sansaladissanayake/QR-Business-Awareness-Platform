import React from 'react';
import Image from 'next/image';
import { Business } from '@/data/businesses';

interface ProfileHeaderProps {
  business: Business;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ business }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 mb-8">
      <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-xl">
        <Image
          src={business.logo}
          alt={`${business.name} logo`}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
          {business.name}
        </h1>
        <p className="text-sm md:text-base text-gray-300 font-medium max-w-sm mx-auto leading-relaxed">
          {business.description}
        </p>
      </div>
    </div>
  );
};
