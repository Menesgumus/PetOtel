'use client';

import { useState, useRef } from 'react';
import { MediaAsset } from '@/types/api';
import { deleteAdminMediaAsset, updateAdminMediaAltText } from '@/lib/api/admin';
import { Button } from '@/components/ui/Button';

export default function MediaList({ initialData }: { initialData: MediaAsset[] }) {
  const [data, setData] = useState(initialData);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = async (id: string, usages: string[] = []) => {
    if (usages.length > 0) {
      if (!window.confirm('DİKKAT: Bu görsel şu anda bazı içeriklerde kullanılıyor:\n\n' + usages.join('\n') + '\n\nYine de silmek istediğinize emin misiniz?')) return;
    } else {
      if (!window.confirm('Bu görseli silmek istediğinize emin misiniz?')) return;
    }
    try {
      await deleteAdminMediaAsset(id);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      alert('Görsel silinemedi.');
    }
  };

  const handleAltTextUpdate = async (id: string, newAltText: string) => {
    try {
      await updateAdminMediaAltText(id, newAltText);
      setData(prev => prev.map(item => item.id === id ? { ...item, altText: newAltText } : item));
      alert('Alternatif metin başarıyla güncellendi.');
    } catch (err) {
      alert('Alternatif metin güncellenemedi.');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(selectedFile.type)) {
      alert('Sadece JPEG, PNG ve WebP formatları desteklenir.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const newAsset = await res.json();
      setData(prev => [newAsset, ...prev]);
      
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      alert('Görsel yüklenemedi.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-900">Yeni Görsel Yükle</h3>
          <p className="text-sm text-gray-500 mt-1">JPEG, PNG ve WebP desteklenir.</p>
          <p className="text-xs text-gray-400 mt-1">Farklı oranlardaki gerçek otel fotoğrafları desteklenir. En iyi görünüm için net ve yüksek kaliteli fotoğraflar yükleyin. AI veya stok görsel kullanmayın.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/jpeg,image/png,image/webp" 
            className="hidden"
            id="file-upload"
          />
          <label 
            htmlFor="file-upload"
            className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors"
          >
            Görsel Seç
          </label>
          
          {selectedFile && (
            <span className="text-sm text-gray-600 truncate max-w-[200px]">
              {selectedFile.name}
            </span>
          )}

          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || isUploading}
            className="w-full sm:w-auto"
          >
            {isUploading ? 'Yükleniyor...' : 'Yükle'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Henüz görsel yüklenmemiş.
          </div>
        ) : (
          data.map((asset) => (
            <div key={asset.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="aspect-video w-full bg-gray-100 relative group">
                <img 
                  src={asset.url} 
                  alt={asset.altText || 'Görsel yüklenemedi'} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-mono text-gray-500 truncate" title={asset.originalFilename}>
                    {asset.originalFilename}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(asset.id.toString());
                      alert('ID Kopyalandı');
                    }}
                    className="text-[10px] uppercase font-bold text-gray-400 hover:text-brand-navy ml-2 shrink-0"
                  >
                    ID Kopyala
                  </button>
                </div>
                
                <div className="mt-auto pt-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Alternatif Metin</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      defaultValue={asset.altText || ''}
                      onBlur={(e) => {
                        if (e.target.value !== (asset.altText || '')) {
                           handleAltTextUpdate(asset.id, e.target.value);
                        }
                      }}
                      className="flex-1 text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-brand-navy"
                      placeholder="Alternatif metin..."
                    />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                     <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(asset.url);
                          alert('URL Kopyalandı');
                        }}
                        className="text-xs text-brand-navy hover:underline"
                     >
                       URL Kopyala
                     </button>
                     <button
                        type="button"
                        onClick={() => handleDelete(asset.id, asset.usages)}
                        className="text-xs text-red-600 hover:underline"
                     >
                       Sil
                     </button>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Kullanım Durumu</label>
                    {asset.usages && asset.usages.length > 0 ? (
                      <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside h-16 overflow-y-auto pr-1">
                        {asset.usages.map((usage, idx) => (
                          <li key={idx} className="truncate" title={usage}>{usage}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-xs text-gray-400 italic">Henüz kullanılmıyor</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
