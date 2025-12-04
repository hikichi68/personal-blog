import Link from 'next/link';
import Hero from '@/components/Hero'; // 修正されたHeroをインポート
// 💡 修正: おすすめメニューのデータ取得はトップページでは不要なため削除
// import { getRecommendedItems } from './data/menu'; 

// トップページ（ヒーロー＆簡単な紹介）コンポーネント
export default async function Home() {
    // 💡 修正: データ取得処理を削除
    // const featuredItems = await getRecommendedItems();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 1. ヒーローセクション */}
            {/* 💡 修正後のHeroコンポーネントを使用: 大きな動画/画像を背景に表示 */}
            <Hero
                title="Royal Chord"
                subtitle="The Best Cocktail and Whiskey Bar in Tokyo"
                imageOn
            />

            {/* 2. 店舗紹介セクション (簡潔な紹介文) */}
            <main id="store-introduction" className="container mx-auto p-8 pt-16 max-w-4xl">
                <div className="bg-white p-10 rounded-xl shadow-2xl border-t-4 border-red-600">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        <span className="text-red-700">|</span> 上質な空間で響きあう時間
                    </h2>

                    <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
                        Royal Chordは、東京の中心、丸の内に佇む隠れ家的なバーです。
                        世界中から厳選したウイスキー、季節の果実を使ったカクテル、
                        そして熟練のバーテンダーが奏でる繊細な技。
                        すべてが調和し、あなたの夜を特別なものにします。
                    </p>

                    <p className="text-md text-gray-600 leading-relaxed mb-10 text-center">
                        喧騒を忘れさせる落ち着いた空間で、極上の”一杯”とともに、
                        心ゆくまでおくつろぎください。
                    </p>

                    <div className="flex justify-center space-x-4">
                        <Link 
                            href="" 
                            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition duration-300"
                        >
                            全メニューを見る
                        </Link>
                        <Link 
                            href="/contact" 
                            className="px-6 py-3 border border-gray-400 text-gray-800 font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                        >
                            お問い合わせ・アクセス
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}