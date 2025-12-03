import React from 'react';
import { Metadata } from 'next';
import { getAllPosts, PostListItem } from '@/app/data/blog'; 
import { BlogPostDate } from '@/components/BlogPostDate'; 
import Link from 'next/link'; 

export const metadata: Metadata = {
    title: "Blog",
    description: "Royal Chordのブログ記事一覧ページです。",
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
                    <article 
                        key={post.databaseId} 
                        className="bg-white p-6 rounded-lg shadow-xl border-l-4 border-red-700 hover:border-red-900 transition duration-300"
                    >
                        <Link href={`/blog/${post.slug}`} passHref>
                            {post.featuredImage && (
                                <img 
                                    src={post.featuredImage.node.sourceUrl} 
                                    alt={post.featuredImage.node.altText || post.title} 
                                    className="mb-4 w-full h-48 object-cover rounded"
                                />
                            )}
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2 hover:text-red-700 transition duration-150">
                                {post.title}
                            </h2>
                        </Link>
                        
                        <BlogPostDate dateString={post.date} />
                        <p className="text-sm text-gray-500 mb-3">著者: {post.author.node.name}</p>

                        <div 
                            className="text-gray-700 mt-3 excerpt-content" 
                            dangerouslySetInnerHTML={{ __html: post.excerpt }} 
                        />
                        
                        <Link 
                            href={`/blog/${post.slug}`} 
                            className="mt-4 inline-block text-red-600 hover:text-red-800 font-medium transition duration-150"
                        >
                            続きを読む &rarr;
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}