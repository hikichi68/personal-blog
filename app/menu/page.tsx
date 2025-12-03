import Link from 'next/link';
import Image from 'next/image';
import { getRecommendedItems } from '../data/menu'; // おすすめメニュー取得関数をインポート
// 💡 修正: lucide-react のインポートを削除

export default async function MenuIndexPage() {
    // おすすめメニューアイテムを取得
    const recommendedItems = await getRecommendedItems();

    return (
        <div className="container mx-auto p-4 md:p-8">
            {/* ページのタイトルを「おすすめメニュー一覧」に変更 */}
            <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800 border-b pb-3">
                <span className="text-red-700">|</span> おすすめメニュー一覧
            </h1>
            
            {recommendedItems.length === 0 ? (
                // メニューがない場合のメッセージ
                <div className="text-center text-lg text-gray-500 p-10 bg-white rounded-xl shadow-lg">
                    現在、おすすめのメニューはありません。
                    右のカテゴリメニューからお好みのメニューをお探しください。
                </div>
            ) : (
                // グリッド表示
                // 💡 修正点: モバイル時（smブレークポイント以下）のグリッド列数を2列に変更し、カードを小型化
                // grid-cols-2: スマホでも2列で表示（より多くのアイテムをコンパクトに）
                // md:grid-cols-3: タブレットサイズで3列
                // xl:grid-cols-4: デスクトップで4列
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {recommendedItems.map((item: any) => ( // recommendedItemsを使用
                        // カードコンテナ
                        <div 
                            key={item.databaseId} 
                            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col"
                        >
                            {/* 画像エリア - 高さを少し低く調整 (h-32) */}
                            {/* 💡 修正点: カードの高さを h-48 から h-32 へ縮小し、モバイル時のコンパクト化に対応 */}
                            <div className="relative h-32 sm:h-40 w-full bg-gray-100 flex-shrink-0">
                                {item.menuFields?.menuphoto?.node?.sourceUrl ? (
                                    <Image
                                        src={item.menuFields.menuphoto.node.sourceUrl}
                                        alt={item.title}
                                        fill={true} // layout="fill" の代替
                                        style={{objectFit: 'cover'}} // objectFit="cover" の代替
                                        className="filter brightness-[0.98]"
                                        unoptimized={false}
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400 text-xs font-semibold">
                                        画像なし
                                    </div>
                                )}
                                {/* 💡 おすすめ/季節限定バッジ - おすすめは必ず付くはずだが、念のため */}
                                {item.menuFields?.isRecommended && (
                                    <span className="absolute top-0 left-0 bg-red-700 text-white text-[10px] font-bold px-2 py-1 rounded-br-md shadow-sm z-10">
                                        Pick Up
                                    </span>
                                )}
                                {/* isRecommended が true の場合は左端から少しずらす */}
                                {item.menuFields?.isseasonal && (
                                    <span className={`absolute top-0 ${item.menuFields?.isRecommended ? 'left-12' : 'left-0'} bg-blue-700 text-white text-[10px] font-bold px-2 py-1 rounded-br-md shadow-sm z-10`}>
                                        季節限定
                                    </span>
                                )}
                            </div>
                            
                            <div className="p-2 sm:p-3 flex flex-col flex-grow">
                                {/* 💡 タイトル (text-sm) - モバイルでの視認性を考慮し、少し縮小 */}
                                <h3 className="text-sm font-bold text-gray-800 mb-1 line-clamp-1">
                                    {item.title}
                                </h3>

                                {/* 💡 説明文 (text-xs) - サイズ変更なし */}
                                <div 
                                    className="text-xs text-gray-600 mb-2 italic line-clamp-2 min-h-[2.5em]"
                                    dangerouslySetInnerHTML={{ __html: item.content || "説明がありません。" }}
                                />

                                <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                                    {/* 💡 価格 (text-xs) - モバイル時のコンパクト化に対応 */}
                                    <p className="text-xs font-bold text-indigo-700">
                                        {item.menuFields?.price ? `¥${item.menuFields.price.toLocaleString()}` : ''}
                                    </p>
                                    <Link 
                                        href={`/menu/detail/${item.slug}`} 
                                        className="text-[10px] text-white bg-gray-800 px-2 py-1 rounded hover:bg-gray-700 transition"
                                    >
                                        詳細
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* フッター文言の調整 */}
             <div className="text-center mt-12">
             <p className="text-sm text-gray-500">
                    その他のメニューについては、
                    {/* 💡 修正: PC (lg:) とモバイルで文言を切り替え */}
                    <span className="hidden lg:inline">右のカテゴリメニューから</span>
                    <span className="lg:hidden">カテゴリメニューから</span>
                    お好みのものをお探しください。
                </p>
            </div>
        </div>
    );
}