import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'プライバシーポリシー | Royal Chord',
    description: '当店の個人情報保護方針についてご案内します。',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-extrabold text-gray-800 border-b-4 border-red-600 pb-4 mb-8">
                プライバシーポリシー
            </h1>
            
            <section className="space-y-6 text-gray-700">
                <p>
                    Royal Chord（以下、当サイト）は、お客様のプライバシーを尊重し、個人情報の保護に最大限の注意を払っています。
                    本ポリシーは、当サイトにおけるお客様の個人情報の取り扱いについて説明するものです。
                </p>
                
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. 個人情報の収集と利用目的</h2>
                <p>
                    当サイトでは、ご予約やお問合せの際に、氏名、メールアドレス、電話番号などの個人情報を収集する場合がございます。
                    これらの情報は、以下の目的でのみ利用し、目的外で利用することはありません。
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>ご予約の確認、管理、及びお客様へのご連絡</li>
                    <li>お問合せ内容への回答、情報提供</li>
                    <li>サービス向上のための分析（個人を特定できない範囲で）</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. 個人情報の第三者への提供</h2>
                <p>
                    法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. セキュリティ</h2>
                <p>
                    お客様の個人情報の漏洩、紛失、破壊、改ざん等を防止するため、必要な安全管理措置を講じ、適切な管理を行います。
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