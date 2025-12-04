"use client"; 
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

interface LeftSidebarProps {
    onClickLink?: () => void; 
    className?: string;
}

const categories = [
    { name: 'About', href: '/about', key: 'about' },
    { name: 'Access', href: '/access', key: 'access' }, 
    { name: 'Private', href: '/private', key: 'private' }, 
    { name: 'Blog', href: '/blog', key: 'blog' }, 
];

// 💡 Propsを受け取るように修正
export function LeftSidebar({ onClickLink, className }: LeftSidebarProps) { 
    const pathname = usePathname(); 
    
    const isActive = (href: string) => {
        if (href === '/') {
            return false;
        }
        return pathname.startsWith(href);
    };

    return (
        <aside className={`
            p-4 bg-gray-800 text-white shadow-xl
            ${className || ''} `}>
            <div className="flex justify-between items-center mb-4 lg:hidden border-b border-gray-700 pb-2">
                <span className="text-xl font-serif tracking-widest text-white">Navigation</span>
                <button onClick={onClickLink} className="text-2xl text-red-600 hover:text-red-500 transition focus:outline-none">
                    <FontAwesomeIcon icon={faTimes} /> 
                </button>
            </div>
            
            {/* 💡 修正 2: 既存の Navigation 見出しをモバイルでは非表示に切り替える */}
            <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 hidden lg:block">Navigation</h2>
            <nav>
                <ul className="space-y-2">
                    {categories.map((category) => (
                        <li key={category.key}>
                            <Link 
                                href={category.href}
                                // 💡 リンククリック時にドロワーを閉じる関数を実行
                                onClick={onClickLink}
                                className={`
                                    block py-2 px-3 rounded transition duration-150
                                    ${isActive(category.href) 
                                        ? 'bg-red-600 font-bold' 
                                        : 'hover:bg-gray-700' 
                                    }
                                `}
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}