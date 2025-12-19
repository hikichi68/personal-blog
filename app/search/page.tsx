import React from 'react';
import { Metadata } from 'next';
import { searchPosts } from '@/app/data/blog';
import Link from 'next/link';
import { BlogPostDate } from '@/components/BlogPostDate';

// 検索エンジンのインデックス対象外にする（検索結果ページは不要なため）
export const metadata: Metadata = {
    title: "検索結果 | The Bartender's Memoir",
    robots: "noindex",
};

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>;
}) {
    const { q: query } = await searchParams;
    const posts = query ? await searchPosts(query) : [];

    return (
        <div className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
            <header className="mb-12 border-b border-gray-200 pb-8">
                <p className="text-sm text-red-700 font-bold mb-2 uppercase tracking-widest">Search Results</p>
                <h1 className="text-4xl font-serif font-bold text-gray-900">
                    「{query || ''}」の検索結果
                </h1>
                <p className="text-gray-500 mt-2">{posts.length} 件の記事が見つかりました</p>
            </header>

            {posts.length > 0 ? (
                <div className="grid gap-8">
                    {posts.map((post) => (
                        <Link 
                            key={post.slug} 
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col md:flex-row gap-6 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        >
                            {post.featuredImage && (
                                <div className="md:w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                                    <img 
                                        src={post.featuredImage.node.sourceUrl} 
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col justify-center">
                                <div className="text-xs text-gray-400 mb-1">
                                    <BlogPostDate dateString={post.date} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors mb-2">
                                    {post.title}
                                </h2>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    詳細を読む — {post.title} についての情報をチェックする
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg mb-6">該当する記事が見つかりませんでした。</p>
                    <Link 
                        href="/blog" 
                        className="text-red-700 font-bold hover:underline"
                    >
                        最新の記事一覧へ戻る
                    </Link>
                </div>
            )}
        </div>
    );
}