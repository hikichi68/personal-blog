'use client'; 

import React, { useState } from 'react';
import { Logo } from './Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 必要なアイコンとコンポーネントをインポート
import { faBars, faTimes, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { LeftSidebar } from './LeftSidebar'; 
// import { faWebAwesome } from '@fortawesome/free-brands-svg-icons' // 💡 未使用のためここでは削除

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    // ⬇️ 💡 状態管理: メニュー開閉状態を Header 内部で管理
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleCloseMenu = () => setIsMenuOpen(false); // リンククリック時にドロワーを閉じる

    return (
        // 💡 修正 1: 受け取った className を結合し、z-index を z-50 に上げて固定
        <header className={`w-full h-20 border-b border-gray-200 bg-white sticky top-0 z-50 ${className || ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
                
                {/* 1. ロゴ */}
                <Logo className="text-2xl font-serif tracking-widest text-gray-900 bg-transparent py-0 px-0" boxOn={false} /> 
                
                {/* 2. アクション群（右側） */}
                {/* 💡 PC (lg) では LangToggle と予約ボタン、モバイルではハンバーガーも表示 */}
                <div className="flex items-center space-x-4 sm:space-x-6">

                    {/* 予約ボタン (最重要アクション) */}
                    <a href="/reserve" className="
                        bg-red-700 
                        text-white 
                        /* 💡 モバイル向けにパディングとフォントを少し調整 */
                        px-3 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm 
                        rounded-sm font-medium hover:bg-red-800 transition shadow-md 
                    ">
                        <FontAwesomeIcon icon={faCalendarCheck} className="mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">ご予約</span> {/* 💡 モバイルでは文字を非表示にしても良い */}
                    </a>

                    {/* 💡 新規追加: ハンバーガーボタン (PCでは非表示) */}
                    <button 
                        onClick={toggleMenu} 
                        // PCビューでは LeftSidebar があるため、モバイルでのみ表示 (lg:hidden)
                        className="text-2xl text-red-700 lg:hidden focus:outline-none w-10 h-10 flex items-center justify-center"
                    >
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                    </button>
                </div>
            </div>
            
            <div className={`
                fixed top-0 right-0 bottom-0 z-40 lg:hidden 
                bg-gray-900/80 overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out
                w-64 sm:w-80
    
                // 💡 開閉状態に応じた変形 (右からスライド)
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                {/* ✅ ドロワーのコンテンツはこの親 div の中に含める */}
                <div className="pt-20"> 
                    {/* LeftSidebar の内容をドロワーとして利用 */}
                    <LeftSidebar onClickLink={handleCloseMenu} className="shadow-none" />
                </div>
            </div>
        </header>
    );
}