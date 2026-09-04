'use client';

import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download } from 'lucide-react';

interface QRCodeDisplayProps {
  url: string;
  businessName: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ url, businessName }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${businessName.replace(/\s+/g, '-').toLowerCase()}-qr.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={canvasRef}
        className="p-4 rounded-2xl bg-white shadow-2xl shadow-black/40"
      >
        <QRCodeCanvas
          value={url}
          size={200}
          level="H"
          marginSize={0}
        />
      </div>
      <button
        onClick={downloadQR}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
      >
        <Download className="w-4 h-4" />
        Download QR Code
      </button>
    </div>
  );
};
