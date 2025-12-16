import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface AffiliateItemProps {
  name?: string;
  url?: string;
  catchCopy?: string;
  rating?: number; // 1-5
  index: number;   // 商品番号 (1, 2, 3)
}

export const AffiliateItem: React.FC<AffiliateItemProps> = ({
  name,
  url,
  catchCopy,
  rating = 0,
  index,
}) => {
  // 名前もURLもない場合は何も表示しない
  if (!name || !url) return null;

  return (
    <div className="my-8 border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
        <span className="font-bold text-gray-700">Item 0{index}</span>
        {/* 星評価の表示 */}
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
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto px-8 py-3 bg-red-700 text-white font-bold rounded-lg hover:bg-red-800 transition duration-300 shadow-md"
          >
            詳細を見る &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};