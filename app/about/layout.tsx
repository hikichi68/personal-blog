import { Metadata } from 'next';
import React, { ReactNode } from 'react';

// 💡 サーバーコンポーネントなので metadata のエクスポートが可能
export const metadata: Metadata = {
    title: {
        default: "About", // ページ固有のタイトル
        template: "%s | Royal Chord", // layout.tsx で定義されたテンプレートを上書き
    },
    description: "Royal Chordの店舗情報とコンセプトについてのページです。",
};

// 💡 レイアウトコンポーネントの定義
export default function AboutLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {/* children に app/about/page.tsx の内容が入る */}
            {children}
        </>
    );
}