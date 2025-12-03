import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Private",
    description: "Royal Chordのプライベートダイニング/貸切イベントページです。",
}

export default function PrivatePage() {
    return (
        <div className="py-8">
            <h1 className="text-4xl font-serif font-bold border-b-2 border-red-700 pb-3 mb-8">
                プライベートダイニング / 貸切イベント
            </h1>
            
            <div className="space-y-8">
                
                {/* プライベート利用の概要 */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 border-l-4 border-red-700 pl-3">特別な時間と空間</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Royal Chordでは、VIPの接待、記念日、小規模なパーティーなど、お客様の特別な瞬間を演出するためのプライベートダイニングルームをご用意しております。
                        バーラウンジの一部貸切も承っておりますので、お気軽にご相談ください。
                    </p>
                </div>

                {/* 詳細情報セクション */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">🍽️ 貸切プラン（レストラン）</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                            <li>最大収容人数: 12名</li>
                            <li>最低保証料金: ¥150,000〜</li>
                            <li>専用ソムリエの配置可能</li>
                        </ul>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">🥃 貸切プラン（バーラウンジ）</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                            <li>最大収容人数: 30名（立食）</li>
                            <li>最低保証料金: 要相談</li>
                            <li>オリジナルカクテル開発サービス</li>
                        </ul>
                    </div>
                </div>

                {/* 問い合わせボタン */}
                <div className="text-center pt-4">
                    <a href="/reserve" className="inline-block bg-yellow-600 text-white font-semibold py-3 px-8 rounded-md shadow-xl hover:bg-yellow-700 transition duration-300">
                        貸切・イベントのお問い合わせ
                    </a>
                </div>
            </div>
        </div>
    );
}