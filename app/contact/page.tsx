import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'お問い合わせ | Royal Chord',
    description: '当店へのお問い合わせはこちらから。',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-extrabold text-gray-800 border-b-4 border-red-600 pb-4 mb-8">
                お問い合わせ
            </h1>
            
            <section className="space-y-6 text-gray-700">
                <p className="text-lg">
                    Royal Chordへのお問い合わせは、以下の方法で承っております。
                </p>

                <div className="bg-gray-50 p-6 rounded-xl shadow-lg border-l-4 border-red-600">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">電話によるお問い合わせ</h2>
                    <p className="text-xl font-mono text-red-700">
                        03-xxxx-xxxx
                    </p>
                    <p className="text-sm mt-2">
                        受付時間: 毎日 17:00 - 24:00
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl shadow-lg border-l-4 border-red-600">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Eメールによるお問い合わせ</h2>
                    <p className="text-xl font-mono text-red-700">
                        support@royal-chord.com
                    </p>
                    <p className="text-sm mt-2">
                        ご返信には数営業日いただく場合がございます。
                    </p>
                </div>
                
                <p className="pt-4">
                    ご不明な点がございましたら、お気軽にお問い合わせください。
                </p>
            </section>

            <div className="mt-12 text-center">
                <Link href="/" className="inline-flex items-center text-red-600 hover:text-red-700 transition font-semibold p-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200">
                    トップページに戻る
                </Link>
            </div>
        </div>
    );
}