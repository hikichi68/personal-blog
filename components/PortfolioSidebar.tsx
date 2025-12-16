"use client";

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMartiniGlass, faExternalLinkAlt, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

// 💡 今後実績が増えたらここに追加するだけ
const PORTFOLIO_ITEMS = [
    {
        id: 1,
        title: "Royal Chord",
        description: "レストラン・バー向け公式サイト。メニュー管理や予約動線を意識した設計。",
        url: "https://bar-royal-chord.vercel.app/",
        imageUrl: "/images/Hero.png",
        tags: ["Next.js", "Tailwind CSS"]
    },
    // { id: 2, title: "Next Project...", ... }
];

const SKILLS = ["React", "Next.js", "PHP", "WordPress", "Firebase", "MySQL"];

export function PortfolioSidebar() {
    return (
        <div className="space-y-6">
            {/* セクションタイトル */}
            <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faLaptopCode} className="text-red-700" />
                <span>Works</span>
            </h3>

            {/* 実績リスト */}
            <div className="space-y-4">
                {PORTFOLIO_ITEMS.map((item) => (
                    <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        {/* 画像エリア */}
                        <div className="relative h-28 w-full bg-gray-100 overflow-hidden">
                            <img 
                                src={item.imageUrl} 
                                alt={item.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        
                        {/* コンテンツエリア */}
                        <div className="p-3">
                            <h4 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h4>
                            <p className="text-[11px] text-gray-600 line-clamp-2 mb-3">
                                {item.description}
                            </p>
                            
                            <a 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-700 hover:text-red-800 transition-colors"
                            >
                                <span>サイトを見る</span>
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* スキルセクション */}
            <div className="bg-gradient-to-br from-gray-50 to-red-50 p-4 rounded-xl border border-red-100">
                <div className="flex items-center gap-2 text-red-800 font-bold text-sm mb-3">
                    {/* 💡 アイコンが表示されない問題への対策: 正しくfaCodeを指定 */}
                    <FontAwesomeIcon icon={faMartiniGlass} />
                    <span>Skills</span>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                    {SKILLS.map((skill) => (
                        <span 
                            key={skill} 
                            className="px-2 py-0.5 bg-white border border-red-200 text-red-700 text-[10px] font-medium rounded-md shadow-sm"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
                <p className="text-[10px] text-red-600/80 mt-3 leading-relaxed">
                    モダンなフロントエンド技術を中心に、バックエンドを含めたフルスタックな開発に対応します。
                </p>
            </div>


            {/* 💡 お問い合わせ誘導 (SESとしてのコンバージョン) */}
            <div className="p-4 bg-gray-900 rounded-xl text-white">
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm mb-2">
                    <FontAwesomeIcon icon={faLaptopCode} />
                    <span>Business Inquiries</span>
                </div>
                <p className="text-[10px] text-gray-300 leading-relaxed mb-3">
                    モダンな技術選定でのサイトリニューアルや、開発支援のご相談を承っております。
                </p>
                <button className="w-full py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors">
                    <Link 
                        href="/contact" 
                        className="block w-full py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors text-center">
                        お問い合わせはこちら
                    </Link>
                </button>
            </div>
        </div>
    );
}