'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from './Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { LeftSidebar } from './LeftSidebar'; 

interface HeaderProps {
    className?: string;
}

// ... (import部分は変更なし)

// ... (import部分は変更なし)

export function Header({ className }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleCloseMenu = () => setIsMenuOpen(false); 

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsMenuOpen(false);
        }
    };

    return (
        <header className={`w-full h-20 border-b border-gray-200 bg-white sticky top-0 z-50 ${className || ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
                
                {/* 1. ロゴ */}
                <div className="flex-shrink-0">
                    <Logo className="text-xl sm:text-2xl font-serif tracking-widest text-gray-900 bg-transparent py-0 px-0" boxOn={false} /> 
                </div>
                
                {/* 2. アクション群 */}
                <div className="flex items-center">
                    
                    {/* PC専用エリア: lg(1024px)以上のみ表示 */}
                    <div className="hidden lg:flex items-center space-x-6 mr-4">
                        <div className="flex items-center space-x-5 text-gray-500">
                            <Link href="https://x.com/hik_bar_memoir" target="_blank" rel="noopener" className="hover:text-black transition-colors">
                                <FontAwesomeIcon icon={faXTwitter} size="lg" />
                            </Link>
                            <Link href="https://www.instagram.com/hik_bar_memoir/" target="_blank" rel="noopener" className="hover:text-pink-600 transition-colors">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </Link>
                        </div>
                        <div className="w-px h-6 bg-gray-200"></div>
                        <form onSubmit={handleSearch} className="relative flex items-center">
                            <input 
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-gray-50 border border-gray-200 rounded-full py-1.5 pl-4 pr-10 text-sm focus:bg-white focus:ring-2 focus:ring-red-700 focus:w-64 transition-all duration-300 outline-none w-40"
                            />
                            <button type="submit" className="absolute right-3 text-gray-400 hover:text-red-700">
                                <FontAwesomeIcon icon={faSearch} size="sm" />
                            </button>
                        </form>
                    </div>

                    {/* ハンバーガーボタン: lg未満で表示 */}
                    <button 
                        onClick={toggleMenu} 
                        className="text-2xl text-red-700 lg:hidden focus:outline-none w-10 h-10 flex items-center justify-center relative z-[60]"
                        aria-label="Menu"
                    >
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                    </button>
                </div>
            </div>
            
            {/* モバイルドロワーメニュー */}
            <div className={`fixed top-0 right-0 h-full z-50 bg-gray-900/95 w-72 max-w-[85vw] shadow-2xl transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 pt-24 h-full overflow-y-auto">                    
                    <div className="flex justify-center space-x-8 mb-10 text-white text-2xl">
                        <Link href="https://x.com/hik_bar_memoir" target="_blank" rel="noopener" onClick={handleCloseMenu}><FontAwesomeIcon icon={faXTwitter} /></Link>
                        <Link href="https://www.instagram.com/hik_bar_memoir/" target="_blank" rel="noopener" onClick={handleCloseMenu}><FontAwesomeIcon icon={faInstagram} /></Link>
                    </div>

                    <div className="text-white border-t border-gray-800 pt-6">
                        <LeftSidebar onClickLink={handleCloseMenu} className="shadow-none bg-transparent" />
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={handleCloseMenu} />
            )}
        </header>
    );
}