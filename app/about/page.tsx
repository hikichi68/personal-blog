'use client'; 
import React, { Children, cloneElement, isValidElement, ReactNode, ReactElement, useState } from 'react';
import { Metadata } from 'next';

//export const metadata: Metadata = {
//    title: "About",
//    description: "Royal Chordの店舗情報とコンセプトについてのページです。",
//}

// =================================================================
// 1. StackProps の型定義 (省略なし)
// =================================================================
interface StackProps {
  spacing?: string;
  children: ReactNode;
  className?: string;
}

type ElementWithClassName = ReactElement<{ className?: string }>;

// =================================================================
// 2. Stack コンポーネント本体 (フクロウセレクタの実装) (省略なし)
// =================================================================
const Stack: React.FC<StackProps> = ({ 
  spacing = 'mt-[1.5em]', 
  children, 
  className 
}) => {
  const spacedChildren = Children.map(children, (child, index) => {
    
    if (!isValidElement(child)) {
      return child;
    }
    
    const typedChild = child as ElementWithClassName;
    
    if (index === 0) {
      return typedChild;
    }

    const existingClassName = typedChild.props.className || '';
    
    return cloneElement(typedChild, {
      className: `${existingClassName} ${spacing}`,
    });
  });

  return (
    <div className={className}>
      {spacedChildren}
    </div>
  );
};


// =================================================================
// 3. PostBody Component (Stackを利用) (省略なし)
// =================================================================
interface PostBodyProps { 
    children: ReactNode 
}

function PostBody({ children }: PostBodyProps) {
    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            <h2 className="text-3xl font-serif text-gray-900 border-b border-red-700 pb-2 mb-6">コンセプトと哲学</h2>
            
            {/* 🚨 Stack コンポーネントが各セクションに mt-6 を適用 */}
            <Stack spacing="mt-8"> 
                {children}
            </Stack>
        </div>
    );
}


// =================================================================
// 4. Accordion Components
// =================================================================

interface AccordionItemProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean; 
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-200">
            {/* アコーディオンのヘッダー/トリガー */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-4 text-left font-semibold text-gray-900 hover:bg-gray-100 transition duration-200"
            >
                <span className="text-lg">{title}</span>
                {/* 開閉アイコン */}
                <svg
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            {/* コンテンツエリア */}
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="pb-4 text-gray-700 leading-relaxed pl-2">
                    {children}
                </div>
            </div>
        </div>
    );
};


// =================================================================
// 5. About Page Component (内容を Royal Chord に更新)
// =================================================================

// Hero component (デザイン調整: 濃い背景とセリフ体)
const Hero = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="bg-gray-800 text-white text-center py-20 mb-10">
        <h1 className="text-6xl font-serif font-extrabold tracking-wider">{title}</h1>
        <p className="text-xl font-light mt-3">{subtitle}</p>
    </div>
);


export default function AboutPage() {
    return (
        <div className="bg-gray-50">
            
            <Hero
                title="ROYAL CHORD"
                subtitle="至高の調和を奏でる、大人のための空間"
            />
            
            <PostBody>
                
                {/* 以下の各セクション間に Stack によってマージンが適用されます */}
                <section className="bg-white p-8 rounded-xl shadow-xl border-l-4 border-red-700">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">🍽️ レストラン「ハーモニー」</h2>
                    <p className="text-gray-700 leading-relaxed">
                        当店の料理は、日本の四季折々の素材と伝統的なフランス料理の技法を融合させた「和魂洋才」のフュージョンです。
                        最高の食材と完璧なサーブが織りなす、洗練されたハーモニーを五感でお楽しみください。
                    </p>
                </section>

                <section className="bg-white p-8 rounded-xl shadow-xl border-l-4 border-yellow-600">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">🥃 バーラウンジ「コード」</h2>
                    <p className="text-gray-700 leading-relaxed">
                        ディナー後の時間を彩る、落ち着いたバーラウンジを併設しています。
                        世界各国の稀少なウイスキー、熟練のバーテンダーによるオリジナルカクテル、そして美しい夜景と共に、至福のひとときをお過ごしください。
                    </p>
                </section>

                <section className="bg-white p-8 rounded-xl shadow-xl border-l-4 border-gray-400">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">私たちの哲学</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Royal Chordという名が示す通り、お客様が空間、料理、サービス、全てにおいて「完璧な調和（コード）」を感じられることを最も大切にしています。
                        常に一歩先を行くおもてなしを追求し続けます。
                    </p>
                </section>
                <section className="bg-white p-8 rounded-xl shadow-xl border-l-4 border-gray-400">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">よくあるご質問 (FAQ)</h3>
                    
                    {/* 💡 AccordionItem のリスト */}
                    <AccordionItem title="予約は必須ですか？" defaultOpen={true}>
                        <p>
                            ディナータイムのご利用は、席数に限りがあるため、**事前のご予約を強くお勧めしております**。
                            特に週末や祝日は混み合いますので、お早めにご連絡ください。バーラウンジのご利用は、空席があればご予約なしでもご利用いただけます。
                        </p>
                    </AccordionItem>

                    <AccordionItem title="ドレスコードはありますか？">
                        <p>
                            当店はエレガントな空間を提供しておりますため、スマートカジュアルを推奨しております。
                            極端な軽装（Tシャツ、サンダル等）はご遠慮いただいておりますので、ご了承ください。
                        </p>
                    </AccordionItem>

                    <AccordionItem title="貸切やパーティーは可能ですか？">
                        <p>
                            はい、可能です。最大50名様までの貸切パーティーを承っております。
                            詳細な人数、ご予算、メニューについては、お電話またはお問い合わせフォームよりお気軽にご相談ください。
                        </p>
                    </AccordionItem>
                </section>

                <div className="text-center pt-8 text-gray-500">
                    <span className="text-lg italic font-serif">— Experience the Royal Chord.</span>
                </div>
            </PostBody>
            <div className="h-16"></div> {/* 下部に余白を確保 */}
        </div>
    );
}