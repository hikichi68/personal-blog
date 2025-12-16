"use client"; 

import React from 'react';
import { usePathname } from 'next/navigation';
import { BlogSidebar } from './BlogSidebar';
import { RandomPostsSidebar } from './RandomPostsSidebar';
import { PortfolioSidebar } from './PortfolioSidebar';

interface RightSidebarProps {
    className?: string;
}

export default function RightSidebar({ className }: RightSidebarProps) {
    const pathname = usePathname();

    const renderContent = () => {
        // 1. ブログ記事一覧・詳細ページ (/blog ...)
        if (pathname.startsWith('/blog')) {
            return <BlogSidebar />;
        }

        // 2. プロフィールページ (/profile)
        // 💡 修正: ProfileSidebar を表示
        if (pathname === '/profile') {
            return <PortfolioSidebar />; 
       }
        
        // 3. その他（Home /, Contact /contact, Profile /profile など）
        // Profile用は後で作るとして、一旦全て RandomPostsSidebar を表示
        return <RandomPostsSidebar />;
    };

    return (
        <aside className={`w-full lg:w-80 lg:sticky lg:top-20 lg:h-fit lg:min-h-[calc(100vh-5rem)] p-4 ${className || ''}`}>
            {renderContent()}
        </aside>
    );
}