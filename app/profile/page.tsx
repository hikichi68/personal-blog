import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: "バーテンダー プロフィール | The Bartender's Memoir",
    description: "元ホテルバーテンダー、現インフラエンジニアの筆者が、ITとバー文化の架け橋となるべく情報を発信しています。",
}

export default function ProfilePage() {
    return (
        <div className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
            <h1 className="text-4xl font-serif font-bold text-gray-900 border-b-4 border-red-700 pb-3 mb-12">
                Bartender Profile
            </h1>
            
            <div className="grid md:grid-cols-5 gap-10 items-start">
                
                {/* 💡 1. 著者情報と画像 */}
                <div className="md:col-span-2">
                    <div className="relative w-full aspect-[4/5] bg-gray-200 rounded-xl overflow-hidden shadow-2xl mb-6">
                        <Image 
                            src="/images/profile.webp" 
                            alt="バーテンダーの写真" 
                            fill 
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 40vw"
                        />
                </div>
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg text-white">
                        <h2 className="text-2xl font-serif font-bold mb-1">hik</h2>
                        <p className="text-sm text-slate-400 mb-4 text-balance">The Bartender's Memoir 主宰</p>
                        <hr className="border-slate-700 mb-4" />
                        <p className="text-xs leading-relaxed text-slate-300">
                            10年間のバーテンダーキャリアと、現在のシステムエンジニアとしての知見を融合し、飲食業界のデジタル活用を推進しています。
                        </p>
                    </div>
                </div>

                {/* 💡 2. 経歴・コンセプト */}
                <div className="md:col-span-3 space-y-10">
                    <section>
                        <h3 className="text-2xl font-bold text-gray-800 mb-5 border-l-4 border-red-700 pl-4">コンセプト</h3>
                        <div className="text-lg leading-relaxed text-gray-700 space-y-4 font-serif">
                            <p>
                                「初めての一歩を、確かな喜びへ。久しぶりの一杯を、深い再発見へ。」
                            </p>
                            <p>
                                バーという場所は、時に少しだけ敷居が高く感じられるかもしれません。
                                しかし、その扉の先には日常を彩る豊かな物語と、プロフェッショナルが紡ぐ調和が待っています。
                            </p>
                            <p>
                                私は現在、ITエンジニアとしてシステムインフラを支える仕事に従事しています。
                                その目的は、テクノロジーの力でホテルやレストラン、そしてバーの現場を後押しし、素晴らしいサービス文化を次世代へ繋ぐことにあります。
                            </p>
                            <p>
                                このブログでは、プロの視点から「通うきっかけ」となる知識を届け、皆様とバー文化の良き架け橋となることを目指しています。
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-gray-800 mb-5 border-l-4 border-gray-400 pl-4">経歴</h3>
                        <div className="relative border-l-2 border-gray-200 ml-4 pl-8 space-y-8">
                            <div className="relative">
                                <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-red-700 border-4 border-white"></span>
                                <h4 className="font-bold text-gray-900">2010年 - 2020年</h4>
                                <p className="text-gray-600">都内一流ホテルのバー・ラウンジにてバーテンダーとして勤務。クラシックからモダンまで幅広いカクテルメイクと接客を研鑽。</p>
                            </div>
                            <div className="relative">
                                <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-gray-400 border-4 border-white"></span>
                                <h4 className="font-bold text-gray-900">2020年 - 現在</h4>
                                <p className="text-gray-600">IT業界へ転身。インフラ・サーバエンジニアとして、飲食・ホスピタリティ業界のDXを技術面から支えるべく活動中。</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-gray-800 mb-5 border-l-4 border-gray-400 pl-4">保有資格</h3>
                        <div className="flex flex-wrap gap-4">
                            <span className="bg-red-50 text-red-900 text-sm font-bold px-5 py-2 rounded-full border border-red-200 shadow-sm">
                                ウイスキーコニサー（ウイスキーエキスパート）
                            </span>
                            <span className="bg-red-50 text-red-900 text-sm font-bold px-5 py-2 rounded-full border border-red-200 shadow-sm">
                                J.S.A.認定 ソムリエ
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-gray-500 italic">
                            ※その他、複数のIT国家資格・ベンダー資格を保有
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}