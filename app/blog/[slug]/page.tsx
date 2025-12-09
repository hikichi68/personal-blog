import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, PostDetail, getAllPostSlugs } from '@/app/data/blog'; 
import { BlogPostDate } from '@/components/BlogPostDate';
import { AffiliateItem } from '@/components/AffiliateItem'; // 新規コンポーネント
import Link from 'next/link';

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

    return {
        title: post.title,
        description: post.excerpt ? post.excerpt.replace(/<[^>]+>/g, '') : `Royal Chordの記事: ${post.title}`, 
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post: PostDetail | null = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }
    
    const PostContent = (
        <div className="py-8">
            <article className="bg-white p-6 md:p-10 rounded-lg shadow-2xl">
                {/* 💡 アイキャッチ画像 */}
                {post.featuredImage && (
                    <img 
                        src={post.featuredImage.node.sourceUrl} 
                        alt={post.featuredImage.node.altText || post.title} 
                        className="mb-8 w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
                    />
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
                    {/* カテゴリ表示があればここに追加 */}
                </div>

                {/* 💡 プロのワンポイント（知識・作法系記事の場合に表示） */}
                {post.knowledgeMannersFields?.proOnePoint && ( 
                    <div className="mb-10 p-6 bg-slate-100 border-l-4 border-slate-500 rounded-r-lg">
                        <h3 className="text-xl font-bold mb-3 text-slate-800 flex items-center">
                            <span className="text-2xl mr-2">💡</span> Bartender's Note
                        </h3>
                        <div 
                            className="prose prose-slate max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.knowledgeMannersFields.proOnePoint }} // 💡 アクセス方法を変更
                        />
                    </div>
                )}
                
                {/* 💡 本文の表示 */}
                <div 
                    className="prose max-w-none text-gray-800 leading-relaxed mb-12" 
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                />

                {/* 💡 お酒の詳細データ（レシピ・歴史など） */}
                {(post.knowledgeMannersFields?.recipeIngredients || post.knowledgeMannersFields?.originHistory || post.knowledgeMannersFields?.alcohol_proof) && ( // 💡 全て変更
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

                {/* 💡 商品紹介セクション（収益特化記事の場合に表示） */}
                {(post.revenueReviewFields?.product_1_name || post.revenueReviewFields?.product_2_name || post.revenueReviewFields?.product_3_name) && ( // 💡 全て変更
                    <div className="mt-16 pt-10 border-t border-gray-200">
                        <h2 className="text-3xl font-serif font-bold text-center mb-8">
                            Recommended Items
                        </h2>
                        
                        <AffiliateItem 
                            index={1}
                            name={post.revenueReviewFields?.product_1_name}
                            url={post.revenueReviewFields?.product_1_aff_link_url}
                            catchCopy={post.revenueReviewFields?.product_1_catch_copy}
                            rating={post.revenueReviewFields?.product1RecommendRating}
                        />
                        <AffiliateItem 
                            index={2}
                            name={post.revenueReviewFields?.product_2_name}
                            url={post.revenueReviewFields?.product_2_aff_link_url}
                            catchCopy={post.revenueReviewFields?.product_2_catch_copy}
                            rating={post.revenueReviewFields?.product_2_recommend_rating}
                        />
                        <AffiliateItem 
                            index={3}
                            name={post.revenueReviewFields?.product_3_name}
                            url={post.revenueReviewFields?.product_3_aff_link_url}
                            catchCopy={post.revenueReviewFields?.product_3_catch_copy}
                            rating={post.revenueReviewFields?.product_3_recommend_rating}
                        />
                    </div>
                )}

            </article>

            {/* 💡 一覧へ戻るボタン */}
            <div className="mt-10 text-center">
                <Link 
                    href="/blog" 
                    className="inline-block px-6 py-3 border border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition duration-300"
                >
                    ブログ記事一覧へ戻る
                </Link>
            </div>
        </div>
    );

    return PostContent;
}