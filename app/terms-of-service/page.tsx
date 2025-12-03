import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: '利用規約 | Royal Chord',
    description: '当店のサービスをご利用いただく際の規約についてご案内します。',
};

export default function TermsOfServicePage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-extrabold text-gray-800 border-b-4 border-red-600 pb-4 mb-8">
                利用規約
            </h1>
            
            <section className="space-y-6 text-gray-700">
                <p>
                    この利用規約（以下、「本規約」といいます）は、Royal Chord（以下、「当店」といいます）が提供するサービス（以下、「本サービス」といいます）の利用条件を定めるものです。
                </p>
                
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. 適用</h2>
                <p>
                    本規約は、本サービスの利用に関し、ユーザーと当店との間に適用されます。
                </p>
                
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. 予約とキャンセル</h2>
                <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>予約は、指定された方法（電話、オンライン予約システムなど）でのみ受け付けます。</li>
                    <li>キャンセルまたは変更は、予約時間の24時間前までにご連絡ください。それを過ぎた場合、キャンセル料が発生する場合がございます。</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. 禁止事項</h2>
                <p>
                    ユーザーは、本サービスの利用にあたり、以下の行為を行ってはならないものとします。
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>法令または公序良俗に違反する行為</li>
                    <li>当店や第三者の著作権、商標権その他の権利を侵害する行為</li>
                    <li>その他、当店が不適切と判断する行為</li>
                </ul>
            </section>

            <div className="mt-12 text-center">
                <Link href="/" className="inline-flex items-center text-red-600 hover:text-red-700 transition font-semibold p-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200">
                    トップページに戻る
                </Link>
            </div>
        </div>
    );
}