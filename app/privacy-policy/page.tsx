import React from 'react';
import Link from 'next/link';

// NOTE: titleを「Royal Chord」から「The Bartender's Memoir」に修正
export const metadata = {
    title: 'プライバシーポリシー | The Bartender\'s Memoir',
    description: '当サイトにおける個人情報保護方針とアクセス解析、アフィリエイトプログラムについてご案内します。',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-extrabold text-gray-800 border-b-4 border-red-600 pb-4 mb-8">
                プライバシーポリシー
            </h1>
            
            <section className="space-y-8 text-gray-700 leading-relaxed">
                <p className="border-l-4 border-red-600 pl-3 italic">
                    The Bartender's Memoir（以下、当サイト）は、お客様のプライバシーを尊重し、個人情報の保護に最大限の注意を払っています。
                    本ポリシーは、当サイトにおけるお客様の個人情報の取り扱い、及びアクセス解析、アフィリエイトプログラムへの参加について説明するものです。
                </p>
                
                {/* 1. 収集と利用目的 (変更なし) */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. 個人情報の収集と利用目的</h2>
                <p>
                    当サイトでは、お問合せの際に、氏名、メールアドレスなどの個人情報を収集する場合がございます。
                    これらの情報は、以下の目的でのみ利用し、目的外で利用することはありません。
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>お問合せ内容への回答、情報提供</li>
                    <li>サービス向上のための分析（個人を特定できない範囲で）</li>
                </ul>

                {/* 2. アクセス解析ツールの利用 (追記) */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. アクセス解析ツールの利用</h2>
                <p>
                    当サイトでは、トラフィックデータの収集のために**Google Analytics**を利用しています。
                    このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
                    この機能はCookieを無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。
                </p>
                <p className="text-sm">
                    詳細については、「<a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 underline">Googleのサービスを使用するサイトやアプリから収集した情報のGoogleによる使用</a>」をご確認ください。
                </p>

                {/* 3. アフィリエイトプログラムの参加 (追記) */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. アフィリエイトプログラムへの参加</h2>
                <p>
                    当サイトは、以下の**アフィリエイトプログラム**に参加しています。
                    商品やサービスは当サイトが販売・提供するものではなく、リンク先の各企業が提供するものです。
                    商品の購入やサービス利用に関するトラブル、問い合わせ等は、各企業へ直接お願いいたします。当サイトでは一切の責任を負いかねます。
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-sm font-semibold">
                    <li>Amazonアソシエイト・プログラム</li>
                    <li>その他、ASP（A8.net、もしもアフィリエイト等）が提供するプログラム</li>
                </ul>
                
                {/* 4. 第三者提供・セキュリティ (番号のみ変更) */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. 個人情報の第三者への提供</h2>
                <p>
                    法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. セキュリティ</h2>
                <p>
                    お客様の個人情報の漏洩、紛失、破壊、改ざん等を防止するため、必要な安全管理措置を講じ、適切な管理を行います。
                </p>

                <p className='text-sm text-gray-500 mt-10 pt-4 border-t border-gray-200'>
                    制定日：2025年12月16日
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