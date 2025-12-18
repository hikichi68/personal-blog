import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, PostDetail, getAllPostSlugs } from '@/app/data/blog'; 
import { BlogPostDate } from '@/components/BlogPostDate';
import { AffiliateItem } from '@/components/AffiliateItem';
import Link from 'next/link';

// 💡 必須追加: サニタイズヘルパーをインポート
import { sanitizeHtml } from '@/lib/sanitize'; 
// 修正: RandomPostsSidebar のインポートを削除しました

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const slugs = await getAllPostSlugs();
    return slugs; 
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: "記事が見つかりません" };
    }

    const siteTitle = "The Bartender's Memoir";

    return {
        title: `${post.title} | ${siteTitle}`,
        description: post.excerpt ? post.excerpt.replace(/<[^>]+>/g, '') : `${siteTitle}の記事: ${post.title}`, 
        openGraph: {
            title: post.title,
            description: post.excerpt ? post.excerpt.replace(/<[^>]+>/g, '') : `Royal Chordの記事: ${post.title}`,
            url: `https://blog.barhik.tokyo/blog/${slug}`,
            siteName: siteTitle,
            images: [
                {
                    url: post.featuredImage?.node.sourceUrl || '/default-ogp.jpg',
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ],
            type: 'article',
        },
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post: PostDetail | null = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }
    
    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl"> 
            
            <article className="bg-white p-6 md:p-10 rounded-lg shadow-2xl">
                {post.featuredImage && (
                    <div className="mb-8 w-full overflow-hidden rounded-lg shadow-md bg-gray-100">
                        <img 
                            src={post.featuredImage.node.sourceUrl} 
                            alt={post.featuredImage.node.altText || post.title} 
                            className="w-full h-auto min-h-[300px] object-cover"
                            loading="eager" 
                            fetchPriority="high"
                        />
                    </div>
                )}
                
                {/* 💡 タイトル */}
                <h1 className="text-3xl md:text-5xl font-serif font-extrabold text-gray-900 mb-6 border-b-4 border-red-700 pb-4">
                    {post.title}
                </h1>
                
                {/* 💡 メタ情報 */}
                <div className="flex flex-wrap items-center gap-4 mb-10 text-gray-600 bg-gray-50 p-3 rounded">
                    <BlogPostDate dateString={post.date} />
                    <span className="hidden md:inline">|</span>
                    <span className="text-sm">著者: {post.author.node.name}</span>
                </div>

                {/* 💡 プロのワンポイント */}
                {post.knowledgeMannersFields?.proOnePoint && ( 
                    <div className="mb-10 p-6 bg-slate-100 border-l-4 border-slate-500 rounded-r-lg">
                        <h3 className="text-xl font-bold mb-3 text-slate-800 flex items-center">
                            <span className="text-2xl mr-2">💡</span> Bartender's Note
                        </h3>
                        <div 
                            className="prose prose-slate max-w-none"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.knowledgeMannersFields.proOnePoint) }}
                        />
                    </div>
                )}
                
                {/* 💡 本文の表示 (サニタイズ必須) */}
                <div 
                    className="prose max-w-none text-gray-800 leading-relaxed mb-12" 
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                />

                {/* 💡 お酒の詳細データ（レシピ・歴史など） */}
                {(post.knowledgeMannersFields?.recipeIngredients || post.knowledgeMannersFields?.originHistory || post.knowledgeMannersFields?.alcohol_proof) && ( 
                    <div className="my-12 border-t-2 border-gray-100 pt-8">
                        <h3 className="text-2xl font-serif font-bold mb-6 text-gray-900">Data & History</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {post.knowledgeMannersFields?.recipeIngredients && (
                                <div>
                                    <h4 className="font-bold text-red-700 mb-2">Standard Recipe</h4>
                                    <div className="bg-red-50 p-4 rounded text-gray-700 whitespace-pre-wrap">
                                        {post.knowledgeMannersFields.recipeIngredients}
                                    </div>
                                </div>
                            )}
                            <div>
                                {post.knowledgeMannersFields?.alcohol_proof && (
                                    <div className="mb-4">
                                        <h4 className="font-bold text-gray-700 mb-1">Strength</h4>
                                        <p className="text-gray-600">{post.knowledgeMannersFields.alcohol_proof}</p>
                                    </div>
                                )}
                                {post.knowledgeMannersFields?.originHistory && (
                                    <div>
                                        <h4 className="font-bold text-gray-700 mb-1">History</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">{post.knowledgeMannersFields.originHistory}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* 💡 商品紹介セクション（アフィリエイト・PR表示追加） */}
                {(post.revenueReviewFields?.product_1_name || post.revenueReviewFields?.product_2_name || post.revenueReviewFields?.product_3_name) && (
                    <div className="mt-16 pt-10 border-t border-gray-200">
                        {/* 💡 [PR]表示を明確に追記 */}
                        <p className="text-center text-sm font-bold text-red-700 mb-2">[PR] 当記事はアフィリエイトプログラムによる広告を含みます。</p>
                        <h2 className="text-3xl font-serif font-bold text-center mb-8">
                            Recommended Items
                        </h2>
                        
                        <AffiliateItem 
                            index={1}
                            name={post.revenueReviewFields?.product_1_name}
                            imageUrl={post.revenueReviewFields?.product_1_image?.node?.sourceUrl}
                            url={post.revenueReviewFields?.product_1_aff_link_url}
                            redirectSlug={post.revenueReviewFields?.product_1_redirect_slug}
                            catchCopy={post.revenueReviewFields?.product_1_catch_copy}
                            rating={post.revenueReviewFields?.product1RecommendRating}
                        />
                        <AffiliateItem 
                            index={2}
                            name={post.revenueReviewFields?.product_2_name}
                            imageUrl={post.revenueReviewFields?.product_2_image?.node?.sourceUrl}
                            url={post.revenueReviewFields?.product_2_aff_link_url}
                            redirectSlug={post.revenueReviewFields?.product_2_redirect_slug}
                            catchCopy={post.revenueReviewFields?.product_2_catch_copy}
                            rating={post.revenueReviewFields?.product_2_recommend_rating}
                        />
                        <AffiliateItem 
                            index={3}
                            name={post.revenueReviewFields?.product_3_name}
                            imageUrl={post.revenueReviewFields?.product_3_image?.node?.sourceUrl}
                            url={post.revenueReviewFields?.product_3_aff_link_url}
                            redirectSlug={post.revenueReviewFields?.product_3_redirect_slug}
                            catchCopy={post.revenueReviewFields?.product_3_catch_copy}
                            rating={post.revenueReviewFields?.product_3_recommend_rating}
                        />
                    </div>
                )}

            </article>

            {post.globalFields?.aff_banner_image?.node?.sourceUrl && (
                <div className="mt-16 pt-10 border-t border-gray-100">
                    <p className="text-center text-xs text-gray-400 mb-4">ADVERTISEMENT</p>
                    <a 
                        href={post.globalFields.aff_banner_url || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                        <img 
                            src={post.globalFields.aff_banner_image.node.sourceUrl} 
                            alt="サイト共通バナー" 
                            className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                        />
                    </a>
                </div>
            )}

            {/* 💡 一覧へ戻るボタン */}
            <div className="mt-10 text-center">
                <Link 
                    href="/blog" 
                    className="inline-block px-6 py-3 border border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition duration-300"
                >
                    ブログ記事一覧へ戻る
                </Link>
            </div>
            
            {/* 修正: サイドバーエリア (gridの2カラム目) は削除しました */}
        </div>
    );
}