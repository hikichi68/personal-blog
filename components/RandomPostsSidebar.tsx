"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// 💡 新しく作った関数と型をインポート
import { getAllBlogCards, BlogCardItem } from '@/app/data/blog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

export function RandomPostsSidebar() {
    // 💡 整形済みの型を使用
    const [posts, setPosts] = useState<BlogCardItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRandomPosts = async () => {
        setIsLoading(true);
        try {
            // 💡 整形済みのデータを取得
            const allCards = await getAllBlogCards();
            
            // シャッフルして3件取得
            const shuffled = allCards.sort(() => 0.5 - Math.random()).slice(0, 3);
            setPosts(shuffled);
        } catch (error) {
            console.error("Failed to fetch random posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomPosts();
    }, []);

    if (isLoading) {
        return (
            <div className="space-y-4 animate-pulse p-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-200 rounded-xl h-48 w-full"></div>
                ))}
            </div>
        );
    }

    if (posts.length === 0) return null;

    return (
        <div className="w-full bg-blue-50/50 p-4 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2 mb-4">
                <span>🎲 Pickup</span>
                <span className="text-xs font-normal text-gray-500 ml-auto">Recommended</span>
            </h3>

            <div className="space-y-4">
                {posts.map((post) => {
                    // 💡 プレースホルダー判定
                    const isPlaceholder = post.imageUrl.includes('placehold.co');

                    return (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="block group">
                            <article className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                
                                {/* 💡 画像エリア: next/image を使用 (fillに変更) */}
                                {/* 親要素に relative, h-32 を指定 */}
                                <div className="relative w-full h-32 bg-gray-200 overflow-hidden">
                                    <Image 
                                        src={post.imageUrl} 
                                        alt={post.title}
                                        // 💡 fillに変更し、親要素いっぱいに広げる
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 256px" // サイドバーのサイズに合わせてsizesを指定
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        unoptimized={isPlaceholder}
                                    />
                                    
                                    {/* カテゴリバッジ */}
                                    {post.categoryName && (
                                        <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                                            {post.categoryName}
                                        </span>
                                    )}
                                    {/* 💡 画像がない場合のテキストをImageの外に出して、Imageがロードされない時に表示 */}
                                    {!post.imageUrl || isPlaceholder && (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs z-20">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div className="p-3">
                                    <h4 className="font-bold text-sm text-gray-800 leading-snug mb-1 line-clamp-2 group-hover:text-red-700 transition-colors">
                                        {post.title}
                                    </h4>
                                    
                                    <div className="flex items-center text-[10px] text-gray-500 mt-2">
                                         <div className="flex items-center gap-1">
                                             <div className="w-4 h-4 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                                <div className="w-full h-full bg-red-100 flex items-center justify-center text-[8px] text-red-800 font-bold">
                                                    {post.authorName.slice(0,1)}
                                                </div>
                                             </div>
                                             <span className="truncate max-w-[100px]">{post.authorName}</span>
                                        </div>
                                        <span className="mx-1">|</span>
                                        {/* 日付変換も一貫させる */}
                                        <span>{new Date(post.date).toLocaleDateString('ja-JP')}</span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    );
                })}
            </div>

            <button 
                onClick={fetchRandomPosts} 
                className="mt-4 w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            >
                <FontAwesomeIcon icon={faSync} />
                <span>おすすめを入れ替える</span>
            </button>
        </div>
    );
}