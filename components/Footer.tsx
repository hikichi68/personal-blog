import React from 'react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="
            w-full py-12 bg-gray-900 text-gray-400 shadow-inner mt-auto border-t border-red-700
        ">
            {/* 中央寄せコンテナ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 🚨 2列グリッド*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-8">
                    
                    {/* 1列目: ブランド＆コンセプト */}
                    <div className='space-y-4'>
                        <Link href="/" className="text-3xl font-serif font-bold text-red-600 hover:text-red-500 transition-colors">
                            The Bartender's Memoir
                        </Link>
                        {/* コンセプト */}
                        <p className="text-sm max-w-sm">
                            元プロのバーテンダーが贈る、<br />カクテル、ウイスキー、バーの作法に関するブログ。
                        </p>
                        
                    </div>

                    {/* 2列目: ナビゲーション (リンクパスを修正) */}
                    <div>
                        <h4 className="text-lg font-bold text-red-600 mb-4 border-b border-red-700 pb-1">サポート＆規約</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy-policy" className="hover:text-red-400 transition">プライバシーポリシー</Link></li>
                            <li><Link href="/terms-of-service" className="hover:text-red-400 transition">利用規約</Link></li>
                        </ul>
                    </div>

                </div>

                {/* 著作権表示 */}
                <div className="mt-10 pt-4 border-t border-gray-700 text-center text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} The Bartender's Memoir. All rights reserved.
                </div>
            </div>
        </footer>
    );
}