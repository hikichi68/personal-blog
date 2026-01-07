import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: '利用規約・免責事項 | The Bartender\'s Memoir',
    description: '当ブログのご利用に関する規約、著作権、およびAmazonアソシエイト等の免責事項について定めています。',
};

export default function TermsOfServicePage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-extrabold text-gray-800 border-b-4 border-red-600 pb-4 mb-8">
                利用規約・免責事項
            </h1>
            
            <section className="space-y-8 text-gray-700 leading-relaxed">
                <p className="border-l-4 border-red-600 pl-3 italic">
                    この規約は、The Bartender's Memoir（以下、「当サイト」といいます）が提供する情報、及びアフィリエイトプログラムを含む外部サービス利用に関する条件を定めるものです。
                </p>
                
                {/* 1. 情報の正確性 */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. 当サイトが提供する情報の正確性</h2>
                <p>
                    当サイトで掲載している情報やコンテンツは、バーテンダーとしての知識や個人的な見解に基づいていますが、その正確性、確実性、完全性を保証するものではありません。
                    情報のご利用は、読者ご自身の責任において行っていただけますようお願いいたします。
                </p>

                {/* 2. 著作権 */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. 著作権と引用について</h2>
                <p>
                    当サイトに掲載されている文章、画像、動画、その他すべてのコンテンツの著作権は、当サイト運営者または各権利保有者に帰属します。
                    著作権法で認められている引用の範囲を超えて、無断で転載、複製、改変、再配布することを禁止します。
                </p>
                
                {/* 3. Amazonアソシエイトについて (必須項目) */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Amazonアソシエイト・プログラムについて</h2>
                <p>
                    当サイト（The Bartender's Memoir）は、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
                </p>
                <p className="font-semibold">
                    「Amazonのアソシエイトとして、当メディアは適格販売により収入を得ています。」
                </p>

                {/* 4. 免責事項 */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 text-red-700">4. 免責事項</h2>
                <ul className="list-disc list-inside ml-4 space-y-3">
                    <li>
                        <strong>外部サイトについて:</strong> 当サイトからリンクやバナーによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
                    </li>
                    <li>
                        <strong>商品・サービスの購入について:</strong> 当サイトは、アフィリエイトプログラムにより商品をご紹介致しております。商品に関するお問い合わせは、直接販売店（Amazon.co.jp等）へご連絡ください。当サイトでは商品の在庫確認や配送状況に関する回答はいたしかねます。
                    </li>
                    <li>
                        <strong>損害の補償:</strong> 当サイトのコンテンツ利用や、紹介している商品の利用によって生じた損害（精神的苦痛、その他の不利益）について、当サイトは一切の責任を負いません。
                    </li>
                </ul>

                {/* 5. 禁止事項 */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. 禁止事項</h2>
                <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>法令または公序良俗に違反する行為</li>
                    <li>当サイトや第三者の権利、著作権、肖像権を侵害する行為</li>
                    <li>当サイトの運営を妨害する行為</li>
                </ul>
                
                <p className='text-sm text-gray-500 mt-10 pt-4 border-t border-gray-200'>
                    制定日：2025年12月16日<br />
                    最終更新日：2026年1月7日
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