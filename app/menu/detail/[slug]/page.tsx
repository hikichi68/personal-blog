import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link'; // Linkコンポーネントをインポート
import { getMenuDetail } from '@/app/data/menu';

interface MenuDetailPageProps {
    params: {
        slug: string;
    };
}

// 💡 メタデータ生成（SEO用）
export async function generateMetadata({ params }: MenuDetailPageProps) {
    const menu = await getMenuDetail(params.slug);

    if (!menu) {
        return { title: 'Menu Not Found' };
    }

    return {
        title: `${menu.title} | Royal Chord メニュー`,
        description: `${menu.title}の詳細ページです。`,
    };
}

// 💡 ページ本体 (Server Component)
export default async function MenuDetailPage({ params }: MenuDetailPageProps) {
    // WordPressからデータを取得
    const menuData = await getMenuDetail(params.slug);

    // データがなければ 404 ページを表示
    if (!menuData) {
        notFound();
    }

    // ACFフィールドへのショートカット
    const acf = menuData.menuFields;

    return (
        <div className="container mx-auto px-4 py-10 max-w-4xl">
            
            {/* 戻るボタン (上部に追加) */}
            <div className="mb-6">
                <Link href="/menu" className="text-gray-500 hover:text-red-600 transition flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    メニュー一覧に戻る
                </Link>
            </div>

            {/* タイトルエリア */}
            <div className="border-b-4 border-red-600 pb-4 mb-8">
                <h1 className="text-4xl font-serif font-bold text-gray-800">
                    {menuData.title}
                </h1>
                {/* カテゴリ表示 */}
                <div className="mt-2 text-sm text-gray-500 font-semibold">
                    {menuData.menuCategories?.nodes.map((cat: any) => cat.name).join(' / ')}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* 左カラム：画像 */}
                <div>
                    {acf.menuphoto?.node?.sourceUrl ? (
                        <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                            <Image
                                src={acf.menuphoto.node.sourceUrl}
                                alt={acf.menuphoto.node.altText || menuData.title}
                                fill
                                className="object-cover"
                                unoptimized={false}
                                // 💡 修正 1: LCP警告対応 - priorityを追加
                                priority={true}
                                // 💡 修正 2: fill/sizes警告対応 - 適切なsizesを追加
                                // モバイル (100vw) -> タブレット/PC (4xlコンテナの約半分、約32rem = 512px)
                                sizes="(max-width: 768px) 100vw, 50vw" 
                            />
                            {/* 💡 おすすめバッジ */}
                            {acf.isRecommended && (
                                <span className="absolute top-3 left-3 bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                                    おすすめ
                                </span>
                            )}
                        </div>
                    ) : (
                        <div className="h-80 w-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-semibold text-lg">
                            画像がありません
                        </div>
                    )}
                </div>

                {/* 右カラム：詳細情報 */}
                <div className="space-y-6">
                    
                    {/* 説明文 (WordPressの本文を表示) */}
                    {menuData.content ? (
                        <div 
                            className="text-lg text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: menuData.content }} 
                        />
                    ) : (
                        <p className="text-gray-500 italic">詳細な説明はありません。</p>
                    )}

                    {/* 価格 */}
                    {acf.price && (
                        <div className="text-4xl font-extrabold text-indigo-700 pt-2">
                            {/* 💡 価格のフォントをより強く、色を強調 */}
                            ¥{acf.price.toLocaleString()}
                        </div>
                    )}

                    {/* 季節限定バッジ */}
                    {acf.isseasonal && (
                        <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-md">
                            🍂 季節限定メニュー
                        </span>
                    )}

                    {/* アレルギー情報 */}
                    {acf.allergy && acf.allergy.length > 0 && (
                        <div className="bg-yellow-100 p-4 rounded-xl border border-yellow-300">
                            <h3 className="font-bold text-yellow-800 mb-2 flex items-center">
                                <span className="mr-2 text-xl">⚠️</span> アレルギー情報
                            </h3>
                            <ul className="list-disc list-inside text-yellow-900 ml-4 text-sm space-y-1">
                                {acf.allergy.map((item: string, index: number) => (
                                    // 各要素の頭文字を大文字にする
                                    <li key={index}>{item.charAt(0).toUpperCase() + item.slice(1)}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* 戻るボタン (下部) */}
            <div className="mt-12 text-center">
                <Link 
                    href="/menu" 
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out"
                >
                    メニュー一覧に戻る
                </Link>
            </div>
        </div>
    );
}