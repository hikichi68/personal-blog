"use client"; // 💡 クライアントサイドでのデータフェッチに変更するため追加

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// 💡 データフェッチャー関数と型をインポート
import { getRecentPosts, getAllCategories, RecentPost, Category } from '@/app/data/blog';

// 💡 ローディング状態を表現するためのスケルトンコンポーネント
const LoadingSkeleton: React.FC = () => (
    <div className="space-y-10 animate-pulse">
        <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-red-700">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-3">
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-red-700">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="flex flex-wrap gap-2">
                <div className="h-6 w-1/4 bg-gray-100 rounded-full"></div>
                <div className="h-6 w-1/5 bg-gray-100 rounded-full"></div>
                <div className="h-6 w-1/3 bg-gray-100 rounded-full"></div>
            </div>
        </div>
    </div>
);

/**
 * 💡 ブログの右サイドバーに表示するコンポーネント (Client Component)
 * useEffect内で非同期データフェッチを行います。
 */
export const BlogSidebar: React.FC = () => {
    const [recentPosts, setRecentPosts] = useState<RecentPost[] | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // データを並行して取得
                const [postsData, categoriesData] = await Promise.all([
                    getRecentPosts(),
                    getAllCategories(),
                ]);
                setRecentPosts(postsData);
                setCategories(categoriesData);
            } catch (err) {
                console.error("Failed to fetch sidebar data:", err);
                setError("サイドバーのデータ取得に失敗しました。");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); // 最初のレンダリング時のみ実行

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg shadow-md">
                <p>エラー: {error}</p>
            </div>
        );
    }
    
    // データが null の場合は念のため空の配列を使用
    const posts = recentPosts || [];
    const cats = categories || [];

    return (
        <div className="space-y-10">
            {/* 1. 最新記事セクション */}
            <section className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-red-700">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 border-b pb-2">
                    📢 最新記事
                </h3>
                {posts.length > 0 ? (
                    <ul className="space-y-3">
                        {posts.map((post) => (
                            <li key={post.slug} className="text-gray-700 hover:text-red-700 transition duration-150">
                                <Link href={`/blog/${post.slug}`} passHref>
                                    <span className="block truncate hover:underline">
                                        &rsaquo; {post.title}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">最新記事はありません。</p>
                )}
            </section>

            {/* 2. カテゴリセクション */}
            <section className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-red-700">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 border-b pb-2">
                    🏷️ カテゴリ
                </h3>
                {cats.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {cats.map((category) => (
                            <Link 
                                key={category.slug}
                                // 💡 カテゴリページへのリンク
                                href={`/blog/category/${category.slug}`}
                                className="inline-block bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full hover:bg-red-700 hover:text-white transition duration-150"
                            >
                                #{category.name} ({category.count})
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">カテゴリがありません。</p>
                )}
            </section>
        </div>
    );
};