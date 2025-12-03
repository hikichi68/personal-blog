import React from 'react';

interface HeroProps {
    title: string;
    subtitle: string;
    // 💡 修正: ビジュアルをONにするプロパティはそのまま残します
    imageOn?: boolean; 
}

export default function Hero({ title, subtitle, imageOn = false }: HeroProps) {
    // ヒーロービジュアル（動画または画像）が有効な場合
    if (imageOn) {
        return (
            <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden bg-gray-900 shadow-xl">
                
                {/* 1. 背景動画 (public/images/Hero.mp4 を想定) */}
                {/* UXのために loop, muted, autoPlay, playsInline を設定 */}
                <video 
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/images/Hero.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    // 💡 fallback: 動画がロードできない場合に表示するポスター画像 (Hero.pngを想定)
                    poster="/images/Hero.png"
                >
                    {/* 動画がサポートされていないブラウザ向けの代替テキスト */}
                    Your browser does not support the video tag.
                </video>

                {/* 2. オーバーレイ (暗くしてテキストを見やすくする) */}
                <div className="absolute inset-0 bg-black opacity-40"></div>

                {/* 3. テキストコンテンツ (中央に配置) */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
                    <h1 className="text-6xl sm:text-7xl font-serif font-extrabold tracking-tight drop-shadow-lg text-red-500">
                        {title}
                    </h1>
                    <p className="text-xl sm:text-2xl font-light mt-4 max-w-2xl drop-shadow-md text-gray-100">
                        {subtitle}
                    </p>
                </div>
            </div>
        );
    }
    
    // ヒーロービジュアルがオフの場合 (通常のタイトル表示)
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-5xl font-extrabold text-gray-800 tracking-wider mb-2">
                {title}
            </h1>
            <p className="text-xl text-gray-600">
                {subtitle}
            </p>
        </div>
    );
}