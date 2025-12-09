import React from 'react';
import { Metadata } from 'next';
import { getAllPosts, PostListItem } from '@/app/data/blog'; 
import { BlogPostDate } from '@/components/BlogPostDate'; 
import { BlogPostCard } from '@/components/BlogPostCard';
import Link from 'next/link'; 

export const metadata: Metadata = {
    title: "Blog",
    description: "The Bartenders Memoirのブログ記事一覧ページです。",
}

export default async function BlogPage() {
    const posts: PostListItem[] = await getAllPosts();

    // 💡 投稿がない場合の表示
    if (posts.length === 0) {
        return (
            <div className="py-8">
                <h1 className="text-4xl font-serif font-bold border-b-2 border-red-700 pb-3 mb-8">
                    ブログ記事一覧
                </h1>
                <p className="text-lg text-gray-600">現在、公開されているブログ記事はありません。</p>
            </div>
        );
    }

    // 💡 修正点: 記事一覧をラップする div は、レイアウト上の調整を除き、そのままメインコンテンツとして機能します。
    return (
        <div className="py-8">
            <h1 className="text-4xl font-serif font-bold border-b-2 border-red-700 pb-3 mb-8">
                ブログ記事一覧
            </h1>
            
            <div className="space-y-8">
                {posts.map((post) => (
                    <BlogPostCard key={post.databaseId} post={post} />
                ))}
            </div>
        </div>
    );
}