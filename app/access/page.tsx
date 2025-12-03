import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Access",
    description: "Royal Chordの店舗情報とコンセプトについてのページです。",
}

export default function AccessPage() {
    return (
        <div className="py-8">
            <h1 className="text-4xl font-serif font-bold border-b-2 border-red-700 pb-3 mb-8">
                アクセス・営業時間
            </h1>
            
            <div className="space-y-8">
                
                {/* 地図のプレースホルダー */}
                <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                    <p className="text-gray-600 text-xl font-semibold">【Google Map プレースホルダー】</p>
                </div>

                {/* 店舗詳細情報 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-600">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">店舗情報</h2>
                        <dl className="space-y-2 text-gray-700">
                            <div><dt className="font-medium inline">所在地:</dt> <dd className="inline">東京都港区 XX-XX-XX ロイヤルビル 1F/B1F</dd></div>
                            <div><dt className="font-medium inline">電話:</dt> <dd className="inline">03-XXXX-XXXX (ご予約専用)</dd></div>
                            <div><dt className="font-medium inline">定休日:</dt> <dd className="inline">毎週月曜日 / 年末年始</dd></div>
                        </dl>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">営業時間</h2>
                        <dl className="space-y-2 text-gray-700">
                            <div><dt className="font-medium inline">ディナー:</dt> <dd className="inline">18:00 - 22:30 (L.O. 21:00)</dd></div>
                            <div><dt className="font-medium inline">バーラウンジ:</dt> <dd className="inline">18:00 - 24:00 (L.O. 23:30)</dd></div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}