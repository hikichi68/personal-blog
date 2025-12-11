import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: "バーテンダー プロフィール | Royal Chord",
    description: "Royal Chordのバーテンダー、〇〇の自己紹介、資格、経歴をご紹介します。",
}

export default function ProfilePage() {
    return (
        <div className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
            <h1 className="text-4xl font-serif font-bold text-gray-900 border-b-4 border-red-700 pb-3 mb-12">
                Bartender Profile
            </h1>
            
            <div className="grid md:grid-cols-3 gap-10">
                
                {/* 💡 1. 著者情報と画像 */}
                <div className="md:col-span-1">
                    {/* プレースホルダーとして img タグを使用 */}
                    <div className="w-full h-80 bg-gray-200 rounded-xl overflow-hidden shadow-2xl mb-6">
                        {/* <Image src="/path/to/author-photo.jpg" alt="バーテンダーの写真" width={400} height={400} className="object-cover w-full h-full"/> */}
                        <div className="text-center p-8 text-gray-500">
                            [著者写真エリア]
                        </div>
                    </div>
                    <div className="bg-red-50 p-5 rounded-xl border border-red-200 shadow-lg">
                        <h2 className="text-2xl font-serif font-bold text-red-700 mb-1">〇〇（著者の名前）</h2>
                        <p className="text-sm text-gray-600">Royal Chord オーナーバーテンダー</p>
                    </div>
                </div>

                {/* 💡 2. 経歴・コンセプト */}
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-gray-400 pl-3">コンセプト</h3>
                        <p className="text-lg leading-relaxed text-gray-700">
                            「Royal Chord」は、ただお酒を提供するだけでなく、「一杯の体験」と「会話の調和（Chord）」を大切にするバーです。このブログでは、プロのバーテンダーならではの視点から、カクテルの知識、お酒の歴史、そしてバーでのスマートな作法までを、分かりやすく丁寧にお届けします。
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-gray-400 pl-3">経歴</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="p-3 bg-white border-b">
                                <span className="font-semibold text-red-700 w-24 inline-block">1998年</span>：都内有名ホテルバーにてキャリアスタート
                            </li>
                            <li className="p-3 bg-white border-b">
                                <span className="font-semibold text-red-700 w-24 inline-block">2005年</span>：国内外のカクテルコンペティションで多数受賞
                            </li>
                            <li className="p-3 bg-white border-b">
                                <span className="font-semibold text-red-700 w-24 inline-block">2015年</span>：「Royal Chord」をオープン。現在に至る
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-gray-400 pl-3">主な保有資格</h3>
                        <div className="flex flex-wrap gap-3">
                            <span className="bg-red-100 text-red-800 text-sm font-medium px-4 py-1.5 rounded-full shadow">
                                日本バーテンダー協会 (N.B.A.) 認定
                            </span>
                            <span className="bg-red-100 text-red-800 text-sm font-medium px-4 py-1.5 rounded-full shadow">
                                ワインエキスパート (J.S.A.)
                            </span>
                            <span className="bg-red-100 text-red-800 text-sm font-medium px-4 py-1.5 rounded-full shadow">
                                ウイスキー検定1級
                            </span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}