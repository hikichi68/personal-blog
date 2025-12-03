import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Reserve",
    description: "Royal Chordのご予約フォームページです。",
}

export default function ReservePage() {
    return (
        <div className="mx-auto max-w-xl py-8">
            <h1 className="text-4xl font-serif font-bold border-b-2 border-red-700 pb-3 mb-8">
                ご予約フォーム
            </h1>
            
            <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
                
                <p className="text-gray-700 font-medium">
                    ご希望の日時、人数をご入力ください。後日、担当者より折り返しご連絡いたします。
                </p>

                {/* フォームのダミー要素 */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">ご予約希望日時</label>
                        <input type="date" id="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-red-500 focus:ring-red-500" />
                    </div>
                    <div>
                        <label htmlFor="guests" className="block text-sm font-medium text-gray-700">人数</label>
                        <input type="number" id="guests" min="1" max="10" defaultValue="2" className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-red-500 focus:ring-red-500" />
                    </div>
                </div>

                {/* 送信ボタン */}
                <button type="submit" className="w-full bg-red-700 text-white font-semibold py-3 rounded-md shadow-lg hover:bg-red-800 transition">
                    予約内容を確認する
                </button>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
                お電話でのご予約も承っております。
            </div>
        </div>
    );
}