import { Metadata } from 'next';
import Image from 'next/image';
import { getAllGalleryItems } from '@/app/data/gallery';

export const metadata: Metadata = {
    title: "Gallery",
    description: "Royal Chordのフォトギャラリーページです。",
}

// ギャラリーアイテムの型定義
// 現在の gallery.ts のクエリ構造に合わせて、画像データは深くネストしています。
interface GalleryItem {
    databaseId: number;
    title: string;
    galleryDetails: {
        // 画像フィールドの型は MediaItem 接続 Edge
        imageField?: {
            node: {
                sourceUrl: string;
                altText: string;
                // mediaItemUrl や mediaDetails なども取得可能だが、
                // 最低限の表示に必要な sourceUrl と altText を定義
            };
        };
    };
}

export default async function GalleryPage() {
    console.log("🔥 Next.js Server Component: GalleryPage is running.");

    const galleryItems: GalleryItem[] = await getAllGalleryItems();
    
    // デバッグ: ロードされたアイテムの概要をログ出力
    const debugItems = galleryItems.map(i => ({ 
        id: i.databaseId, 
        title: i.title, 
        url: i.galleryDetails?.imageField?.node?.sourceUrl || 'No URL'
    }));
    console.log("--- GalleryPage Component Debug ---");
    console.log("Gallery Items Loaded:", debugItems.length > 0 ? debugItems : '[]');
    console.log("---------------------------------");

    return (
        <div className="py-8">
            <h1 className="text-4xl font-serif font-bold text-gray-800 border-b-4 border-red-700 pb-3 mb-8">
                フォトギャラリー
            </h1>
            
            <div className="space-y-6">
                <p className="text-lg text-gray-700">
                    Royal Chordの空間、そして芸術的な一皿の数々をご覧ください。
                </p>

                {galleryItems.length === 0 ? (
                    <div className="p-8 text-center bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-xl font-semibold text-gray-600">
                            ギャラリー画像が見つかりません。
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            ※ WordPress側で「Photo Gallery」の投稿が公開されているか確認してください。
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {galleryItems.map(item => {
                            // 💡 修正: ネストされた sourceUrl を取得
                            const imageUrl = item.galleryDetails?.imageField?.node?.sourceUrl;
                            const altText = item.galleryDetails?.imageField?.node?.altText || item.title;
                            
                            if (!imageUrl) return null;

                            return (
                                <div 
                                    key={item.databaseId} 
                                    className="aspect-square rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] relative group"
                                >
                                    {/* Next/Image コンポーネント */}
                                    <Image
                                        src={imageUrl}
                                        alt={altText}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        unoptimized={false}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300 flex items-end justify-start p-4">
                                        <p className="text-white text-xl font-bold line-clamp-1">{item.title}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}