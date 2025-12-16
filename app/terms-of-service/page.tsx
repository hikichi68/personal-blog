import React from 'react';
import Link from 'next/link';

// NOTE: titleを「Royal Chord」から「The Bartender's Memoir」に修正。免責事項を強調。
export const metadata = {
    title: '利用規約・免責事項 | The Bartender\'s Memoir',
    description: '当ブログのご利用に関する規約、著作権、および免責事項について定めています。',
};

export default function TermsOfServicePage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-extrabold text-gray-800 border-b-4 border-red-600 pb-4 mb-8">
                利用規約・免責事項
            </h1>
            
            <section className="space-y-8 text-gray-700 leading-relaxed">
                <p className="border-l-4 border-red-600 pl-3 italic">
                    この規約は、The Bartender's Memoir（以下、「当サイト」といいます）が提供する情報、及びリンク先の外部サービス利用に関する条件と免責事項を定めるものです。
                </p>
                
                {/* 1. 適用 */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. 当サイトが提供する情報の正確性</h2>
                <p>
                    当サイトで掲載している情報やコンテンツは、バーテンダーとしての知識や個人的な見解に基づいていますが、その**正確性、確実性、完全性を保証するものではありません**。
                    情報のご利用は、読者ご自身の責任において行っていただけますようお願いいたします。
                </p>

                {/* 2. 著作権 */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. 著作権と引用について</h2>
                <p>
                    当サイトに掲載されている文章、画像、動画、その他すべてのコンテンツの著作権は、当サイト運営者または各権利保有者に帰属します。
                    著作権法で認められている引用の範囲を超えて、無断で転載、複製、改変、再配布することを禁止します。
                </p>
                
                {/* 3. 免責事項（アフィリエイト運用に必須） */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 text-red-700">3. 免責事項（最重要）</h2>
                <ul className="list-disc list-inside ml-4 space-y-3">
                    <li>
                        **リンク先について:** 当サイトからリンクやバナーによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
                    </li>
                    <li>
                        **商品/サービス購入について:** 当サイトが紹介している商品やサービスに関するご質問は、**直接リンク先の企業**へお問い合わせください。当サイト側では対応いたしかねます。
                    </li>
                    <li>
                        **損害について:** 当サイトのコンテンツ利用によって生じた、いかなる損害についても、当サイトは一切の責任を負わないものとします。
                    </li>
                </ul>

                {/* 4. 禁止事項 (簡略化) */}
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. 禁止事項</h2>
                <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>法令または公序良俗に違反する行為</li>
                    <li>当サイトや第三者の権利を侵害する行為</li>
                    <li>当サイトの運営を妨害する行為</li>
                </ul>
                
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