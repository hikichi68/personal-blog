import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, PostDetail, getAllPostSlugs } from '@/app/data/blog'; 
import { BlogPostDate } from '@/components/BlogPostDate';
import Link from 'next/link';

interface PostPageProps {
    params: {
        slug: string;
    };
}

// generateStaticParams は変更なし
export async function generateStaticParams() {
    const slugs = await getAllPostSlugs();
    return slugs;
}

// generateMetadata は変更なし
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return {
            title: "記事が見つかりません",
        };
    }

    return {
        title: post.title,
        description: `Royal Chordのブログ記事: ${post.title}`, 
    };
}


// 💡 投稿詳細ページのメインコンポーネント (変更なし)
export default async function PostPage({ params }: PostPageProps) {
    const post: PostDetail | null = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }
    
    // 💡 記事のコンテンツを表示するためのシンプルなコンポーネント
    const PostContent = (
        <div className="py-8">
            <article className="bg-white p-6 rounded-lg shadow-2xl">
                {/* 💡 アイキャッチ画像 */}
                {post.featuredImage && (
                    <img 
                        src={post.featuredImage.node.sourceUrl} 
                        alt={post.featuredImage.node.altText || post.title} 
                        className="mb-8 w-full h-80 object-cover rounded-lg shadow-md"
                    />
                )}
                
                {/* 💡 タイトル */}
                <h1 className="text-5xl font-serif font-extrabold text-gray-900 mb-4 border-b-4 border-red-700 pb-3">
                    {post.title}
                </h1>
                
                {/* 💡 メタ情報 */}
                <div className="flex items-center space-x-4 mb-8 text-gray-600">
                    <BlogPostDate dateString={post.date} />
                    <span className="text-sm">| 著者: {post.author.node.name}</span>
                </div>
                
                {/* 💡 本文の表示 */}
                <div 
                    className="prose max-w-none text-gray-800 leading-relaxed post-content" 
                    // WordPressから返される content はHTMLなので、dangerouslySetInnerHTML を使用
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                />
            </article>

            {/* 💡 一覧へ戻るボタン */}
            <div className="mt-10 text-center">
                <Link 
                    href="/blog" 
                    className="inline-block px-6 py-3 bg-red-700 text-white font-bold rounded-lg shadow-lg hover:bg-red-800 transition duration-300"
                >
                    &larr; ブログ記事一覧へ戻る
                </Link>
            </div>
        </div>
    );

    return PostContent;
}