'use client';

import { useState, useEffect } from 'react';
import { getAdminMediaAssets } from '@/lib/api/admin';
import { MediaAsset } from '@/types/api';

interface ImageSelectProps {
  name: string;
  defaultValue?: number | string;
}

export function ImageSelect({ name, defaultValue }: ImageSelectProps) {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string>(defaultValue?.toString() || '');

  useEffect(() => {
    getAdminMediaAssets(0, 100)
      .then(data => {
        if (data && data.content) {
          setMediaAssets(data.content);
        } else if (Array.isArray(data)) {
          setMediaAssets(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={selectedId} />
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-navy focus:border-brand-navy text-sm"
      >
        <option value="">-- Görsel Seçilmedi --</option>
        {mediaAssets.map((asset) => (
          <option key={asset.id} value={asset.id}>
            {asset.originalFilename}
          </option>
        ))}
      </select>
      
      {loading && <p className="text-xs text-gray-400">Görseller yükleniyor...</p>}
      
      {!loading && selectedId && (
        <div className="mt-2 relative w-32 h-20 rounded-md overflow-hidden border border-gray-200">
          <img 
            src={mediaAssets.find(a => a.id.toString() === selectedId)?.url || ''} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <p className="text-xs text-gray-500">
        Önce <a href="/admin/media" target="_blank" className="text-brand-navy hover:underline">Görseller</a> sayfasından fotoğraf yükleyin. Sonra bu alanda kapak görselini seçin. Farklı oranlardaki gerçek otel fotoğrafları desteklenir. En iyi görünüm için net ve yüksek kaliteli fotoğraflar yükleyin. AI veya stok görsel kullanmayın.
      </p>
    </div>
  );
}
