import { getMenuItemsByCategory } from '../../../data/menu';
import Link from 'next/link';
import Image from 'next/image';
// 💡 修正: lucide-reactのインポートを削除しました。

// カテゴリのスラッグを読みやすいタイトル形式に整形するヘルパー関数
const formatCategoryName = (s: string) => {
    if (!s) return "カテゴリ";
    // スラッグ内のハイフンやアンダースコアをスペースに置換
    const replaced = s.replace(/[-_]/g, ' ');
    // 各単語の先頭を大文字にする (Title Case)
    return replaced.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// ページのコンポーネントは props として URL のパラメータを受け取ります
export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    
    // 1. カテゴリのスラッグ（例: 'dish'）を使ってデータを取得
    const menuItems = await getMenuItemsByCategory(slug);
    
    // 整形されたカテゴリ名
    const categoryName = formatCategoryName(slug);

    // 2. 存在しないカテゴリの場合の処理
    if (!menuItems || menuItems.length === 0) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800">
                    「{categoryName}」カテゴリのメニューは見つかりませんでした。
                </h1>
                {/* 💡 修正: おすすめメニューに戻るボタンを削除しました。 */}
                {/* <Link href="/menu" className="mt-6 inline-flex items-center text-red-600 hover:text-red-700 transition font-semibold p-2 rounded-lg bg-red-50 hover:bg-red-100">
                    <span>&larr;</span>
                    <span className="ml-2">おすすめメニュー一覧に戻る</span>
                </Link> */}
            </div>
        );
    }

    // 3. データの表示
    return (
        <div className="container mx-auto p-4">
            {/* ページのタイトル */}
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
                <span className="text-red-700">|</span> {categoryName} メニュー
            </h1>
            
            {/* 💡 修正: 3列グリッドから、モバイル2列、タブレット3列、大型デスクトップ4列に変更し、一覧性を向上 */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {menuItems.map((item: any) => (
                    // カードコンテナ
                    <div 
                        key={item.databaseId} 
                        className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
                    >
                        {/* 💡 画像セクション: h-48をh-36に縮小 */}
                        {item.menuFields?.menuphoto?.node?.sourceUrl ? (
                            <div className="relative h-36 w-full bg-gray-100 flex-shrink-0">
                                <Image
                                    src={item.menuFields.menuphoto.node.sourceUrl}
                                    alt={item.menuFields.menuphoto.node.altText || item.title}
                                    fill={true} 
                                    style={{objectFit: 'cover'}} 
                                    className="transition-transform duration-500 hover:scale-105"
                                    unoptimized={false} 
                                />
                                {/* 💡 季節限定バッジ */}
                                {item.menuFields.isseasonal && (
                                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                                        季節限定
                                    </span>
                                )}
                            </div>
                        ) : (
                            // 💡 画像がない場合のプレースホルダー
                            <div className="relative h-36 w-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold flex-shrink-0">
                                画像なし
                            </div>
                        )}

                        {/* 💡 p-5をp-3に縮小 */}
                        <div className="p-3 flex flex-col flex-grow">
                            {/* タイトルとリンク: text-xlをtext-baseに縮小 */}
                            <Link href={`/menu/detail/${item.slug}`} className="block">
                                <h2 className="text-base font-bold text-gray-900 mb-1 hover:text-red-700 transition-colors cursor-pointer line-clamp-1">
                                    {item.title}
                                </h2>
                            </Link>

                            {/* 💡 説明文を数行表示 */}
                            <div 
                                className="text-xs text-gray-600 mb-2 line-clamp-2 min-h-[2.5em]"
                                dangerouslySetInnerHTML={{ __html: item.content || "説明がありません。" }}
                            />

                            {/* 価格表示: text-baseをtext-smに縮小 */}
                            <p className="text-sm font-extrabold text-indigo-700 mt-auto pt-2 border-t border-gray-100">
                                {item.menuFields?.price ? `¥${item.menuFields.price.toLocaleString()}` : '価格情報なし'}
                            </p>
                            
                            {/* 💡 詳細ボタン */}
                            <div className="mt-3 text-right">
                                <Link 
                                    href={`/menu/detail/${item.slug}`} 
                                    className="text-[10px] text-white bg-gray-800 px-2 py-1 rounded-lg hover:bg-gray-700 transition inline-block font-semibold"
                                >
                                    詳細を見る
                                </Link>
                            </div>
                            
                            {/* アレルギー表示は削除済み */}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* 💡 修正: ページ下部におすすめメニューに戻るボタンを削除しました。 */}
            {/* <div className="text-center mt-12">
                <Link href="/menu" className="inline-flex items-center text-red-600 hover:text-red-700 transition font-semibold p-3 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 shadow-sm">
                    <span>&larr;</span>
                    <span className="ml-2">おすすめメニュー一覧に戻る</span>
                </Link>
            </div> */}
        </div>
    );
}