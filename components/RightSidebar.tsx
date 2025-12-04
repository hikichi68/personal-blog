"use client"; // 🚨 URL取得のためクライアントコンポーネントに

import React from 'react';
import { usePathname } from 'next/navigation';
import { BlogSidebar } from './BlogSidebar'; // 💡 修正後のClient Componentをインポート

// プレースホルダー（メニュー・ブログ以外のページ用）
const DefaultSidebar = () => (
    <div className="p-4 bg-white rounded-xl text-sm text-gray-700 shadow-lg border border-gray-200">
        {/* 💡 修正: DefaultSidebar自体にタイトルを含める */}
        <h3 className="text-xl font-bold pb-2 text-gray-800 border-b border-gray-200 mb-4">
            関連情報
        </h3>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="font-semibold mb-1">お知らせ</p>
            <p>Royal Chordへようこそ。ご予約は右上のボタンからどうぞ。</p>
        </div>
    </div>
);

// 💡 修正点: classNameを受け取るようにpropsを定義し、ルート要素に適用
interface RightSidebarProps {
    className?: string; // layout.tsxから渡されるclassNameを受け入れる
}

export default function RightSidebar({ className }: RightSidebarProps) {
    const pathname = usePathname();

    // 💡 修正: Sidebarコンポーネント自体を直接返すように変更 (DefaultSidebar以外はタイトル込み)
    const renderContent = () => {
        if (pathname.startsWith('/blog')) {
            // 💡 BlogSidebarがClient Component化されたため、ここで呼び出しても問題なくなりました
            return <BlogSidebar />;
        }
        // その他のページではDefaultSidebar（タイトル込み）を表示
        return <DefaultSidebar />;
    };
    
    // 💡 修正: getSidebarTitle関数は不要になったため、完全に削除しました。

    return (
        // 💡 修正点: layout.tsxから渡されたclassNameを適用し、内側のdivを削除
        <aside className={`w-full lg:w-64 lg:sticky lg:top-20 lg:h-fit lg:min-h-[calc(100vh-5rem)] p-4 ${className || ''}`}>
            {renderContent()}
        </aside>
    );
}