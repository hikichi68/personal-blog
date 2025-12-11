'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { LeftSidebar } from './LeftSidebar'; 

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleCloseMenu = () => setIsMenuOpen(false); 

    return (
        <header className={`w-full h-20 border-b border-gray-200 bg-white sticky top-0 z-50 ${className || ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
                
                {/* 1. ロゴ */}
                <Logo className="text-2xl font-serif tracking-widest text-gray-900 bg-transparent py-0 px-0" boxOn={false} /> 
                
                {/* 2. アクション群（右側） */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                    
                    {/* 検索アイコン */}
                    <button 
                        onClick={() => alert('検索機能は開発中です！')} 
                        className="text-xl text-gray-600 hover:text-red-700 transition focus:outline-none hidden sm:block"
                        aria-label="検索"
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>

                    {/* 💡 【新規】SNSアイコン (PCビューのみ表示) */}
                    <div className="hidden sm:flex items-center space-x-4 text-xl">
                         <Link 
                            href="https://twitter.com/YourAccount" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-red-700 transition"
                            aria-label="Twitterアカウント"
                        >
                            <FontAwesomeIcon icon={faXTwitter} />
                        </Link>
                        <Link 
                            href="https://instagram.com/YourAccount" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-red-700 transition"
                            aria-label="Instagramアカウント"
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                    </div>

                    {/* ハンバーガーボタン (PCビューでは LeftSidebar があるため、モバイルでのみ表示) */}
                    <button 
                        onClick={toggleMenu} 
                        className="text-2xl text-red-700 lg:hidden focus:outline-none w-10 h-10 flex items-center justify-center"
                        aria-label="メニューを開く"
                    >
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                    </button>
                </div>
            </div>
            
            {/* モバイルドロワー (変更なし) */}
            <div className={`
                fixed top-0 right-0 bottom-0 z-40 lg:hidden 
                bg-gray-900/80 overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out
                w-64 sm:w-80
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="pt-20"> 
                    <LeftSidebar onClickLink={handleCloseMenu} className="shadow-none" />
                </div>
            </div>
        </header>
    );
}