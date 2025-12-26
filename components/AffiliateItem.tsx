import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface AffiliateItemProps {
  name?: string;
  url?: string;
  redirectSlug?: string;
  imageUrl?: string;
  catchCopy?: string;
  rating?: number;
  index: number;
}

export const AffiliateItem: React.FC<AffiliateItemProps> = ({
  name,
  url,
  redirectSlug,
  imageUrl,
  catchCopy,
  rating = 0,
  index,
}) => {
  if (!name) return null;

  // B案：リダイレクトスラッグがあればそちらを優先、なければ直URLを使う
  const finalUrl = redirectSlug ? `/go/${redirectSlug}` : url;

  if (!finalUrl) return null;

  return (
    <div className="my-8 border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
      {/* 商品画像がある場合に表示 */}
      {imageUrl && (
        <div className="w-full h-64 bg-white flex items-center justify-center rounded-t-lg overflow-hidden p-4">
          <img src={imageUrl} alt={name} className="max-w-full max-h-full object-contain" />
        </div>
      )}

      <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
        <span className="font-bold text-gray-700">Item 0{index}</span>
        <div className="flex text-yellow-400 text-sm">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon 
              key={i} 
              icon={faStar} 
              className={i < rating ? "opacity-100" : "opacity-30 text-gray-300"} 
            />
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{name}</h3>
        {catchCopy && (
          <p className="text-gray-600 mb-4 text-sm bg-yellow-50 inline-block px-2 py-1 rounded">
            {catchCopy}
          </p>
        )}
        
        <div className="mt-4 text-center">
          <a 
            href={finalUrl} // ★ここを内部リンクまたはリダイレクトURLに
            className="inline-block w-full sm:w-auto px-8 py-3 bg-red-700 text-white font-bold rounded-lg hover:bg-red-800 transition duration-300 shadow-md"
          >
            詳細を見る &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};