import React from 'react';
import Link from 'next/link';
// FontAwesomeとSNSLinkは使用されていると仮定し、コード構造は維持します
import { SNSLink } from './SNSLink'; 

// 💡 Royal Chordのブランドに合わせた、モダンで落ち着いたフッターデザイン
export function Footer() {
    return (
        <footer className="
            w-full py-12 bg-gray-900 text-gray-400 shadow-inner mt-auto border-t border-red-700
        ">
            {/* 中央寄せコンテナ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 🚨 3列グリッドで情報を整理 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8">
                    
                    {/* 1列目: ブランド＆連絡先情報 */}
                    <div className='space-y-4'>
                        <Link href="/" className="text-3xl font-serif font-bold text-red-600 hover:text-red-500 transition-colors">
                            Royal Chord
                        </Link>
                        <p className="text-sm">極上の美食と上質な時間をご提供します。</p>
                        <div className="text-sm space-y-1 pt-2">
                            <p>〒100-0005 東京都千代田区丸の内 1-1-1</p>
                            <p>TEL: 03-XXXX-XXXX</p>
                        </div>
                    </div>

                    {/* 2列目: ナビゲーション (リンクパスを修正) */}
                    <div>
                        <h4 className="text-lg font-bold text-red-600 mb-4 border-b border-red-700 pb-1">サポート＆規約</h4>
                        <ul className="space-y-2 text-sm">
                            {/* 💡 リンクパスを /privacy-policy に修正 */}
                            <li><Link href="/privacy-policy" className="hover:text-red-400 transition">プライバシーポリシー</Link></li>
                            {/* 💡 リンクパスを /terms-of-service に修正 */}
                            <li><Link href="/terms-of-service" className="hover:text-red-400 transition">利用規約</Link></li>
                            {/* 💡 リンクパスを /contact に修正 */}
                            <li><Link href="/contact" className="hover:text-red-400 transition">お問い合わせ</Link></li>
                        </ul>
                    </div>

                    {/* 3列目: SNS */}
                    <div>
                        <h4 className="text-lg font-bold text-red-600 mb-4 border-b border-red-700 pb-1">ソーシャル</h4>
                        <div className="flex flex-col space-y-2 text-sm">
                            {/* 💡 SNSLinkコンポーネントの使用 (アイコンがあれば赤色にハイライトされます) */}
                            <SNSLink href="https://twitter.com" label="Twitter (X)" />
                            <SNSLink href="https://instagram.com" label="Instagram" />
                            <SNSLink href="https://facebook.com" label="Facebook" />
                        </div>
                    </div>
                </div>

                {/* 著作権表示 */}
                <div className="mt-10 pt-4 border-t border-gray-700 text-center text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} Royal Chord. All rights reserved.
                </div>
            </div>
        </footer>
    );
}