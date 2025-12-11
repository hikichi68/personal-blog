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

const navigationItems = [
    { name: 'Home', href: '/', key: 'home' },
    { name: 'Blog', href: '/blog', key: 'blog' },
    { name: 'Profile', href: '/profile', key: 'profile' },
    { name: 'Contact', href: '/contact', key: 'contact' },
];

export function LeftSidebar({ onClickLink, className }: LeftSidebarProps) { 
    const pathname = usePathname(); 
    
    const isActive = (href: string) => {
 
        if (href === '/') {
            return pathname === '/';
        }

        if (href === '/blog') {
            return pathname.startsWith('/blog');
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
            
            <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 hidden lg:block">Navigation</h2>
            <nav>
                <ul className="space-y-2">
                    {navigationItems.map((item) => (
                        <li key={item.key}>
                            <Link 
                                href={item.href}
                                onClick={onClickLink}
                                className={`
                                    block py-2 px-3 rounded transition duration-150
                                    ${isActive(item.href) 
                                        ? 'bg-red-600 font-bold' 
                                        : 'hover:bg-gray-700' 
                                    }
                                `}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}