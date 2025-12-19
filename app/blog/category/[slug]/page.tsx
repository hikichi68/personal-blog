import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// 💡 カテゴリ別フェッチャーと、カテゴリリスト、記事一覧の型をインポート
import { getPostsByCategorySlug, getAllCategories, PostListItem, Category } from '@/app/data/blog'; 
import { BlogPostDate } from '@/components/BlogPostDate'; 
import { BlogPostCard } from '@/components/BlogPostCard';
import Link from 'next/link'; 

// 💡 動的ルーティングのパラメータの型定義
interface CategoryPageProps {
    params: Promise<{
        slug: string; // カテゴリのスラッグ (例: "wine", "event")
    }>;
}

/**
 * 💡 generateStaticParams:
 * ビルド時に存在する全てのカテゴリのページを静的に生成します。
 */
export async function generateStaticParams() {
    const categories = await getAllCategories();
    
    // カテゴリデータは { name, slug, count } を持つため、slugのみを返します。
    return categories.map((cat) => ({
        slug: cat.slug,
    }));
}

// 💡 該当カテゴリのデータを見つけるヘルパー関数
async function getCategoryData(slug: string): Promise<Category | undefined> {
    const categories = await getAllCategories();
    return categories.find(cat => cat.slug === slug);
}

/**
 * 💡 generateMetadata:
 * カテゴリ名を使って、ページごとのメタデータ (タイトル、ディスクリプション) を動的に設定します。
 */
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    
    const { slug } = await params;    
    const category = await getCategoryData(slug);

    if (!category) {
        // カテゴリが見つからなくても、記事が存在しない可能性もあるため、ここではデフォルトのタイトルを返す
        return {
            title: `カテゴリ: ${slug} | Blog`,
        };
    }

    return {
        title: `${category.name} の記事一覧 | Blog`,
        description: `The Bartender's Memoirのブログ記事のうち、カテゴリ「${category.name}」の記事一覧ページです。`, 
    };
}


// 💡 カテゴリ別記事一覧ページのメインコンポーネント
export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const categorySlug = slug;
    
    // 1. カテゴリ別記事データを取得
    const posts: PostListItem[] = await getPostsByCategorySlug(categorySlug);
    
    // 2. 表示用のカテゴリ名を取得 (サイドバーで使った関数を流用)
    const categoryData = await getCategoryData(categorySlug);
    const categoryName = categoryData ? categoryData.name : categorySlug; // 見つからない場合はスラッグをそのまま表示

    // 💡 投稿がない場合の表示
    if (posts.length === 0) {
        // 記事がない場合は404ではなく、記事がない旨を通知
        return (
            <div className="py-8">
                <h1 className="text-4xl font-serif font-bold border-b-2 border-red-700 pb-3 mb-8">
                    カテゴリ: 「{categoryName}」 の記事一覧
                </h1>
                <p className="text-lg text-gray-600">
                    現在、カテゴリ「{categoryName}」に該当するブログ記事はありません。
                </p>
                <div className="mt-8">
                    <Link 
                        href="/blog" 
                        className="text-red-600 hover:text-red-800 font-medium"
                    >
                        &larr; 全ての記事一覧へ戻る
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8">
            <h1 className="text-4xl font-serif font-bold border-b-2 border-red-700 pb-3 mb-8">
                カテゴリ: 「{categoryName}」 の記事一覧
            </h1>
            
            <div className="space-y-8">
                {/* 記事一覧の表示ロジックは app/blog/page.tsx と同じ */}
                {posts.map((post) => (
                    <BlogPostCard key={post.databaseId} post={post} />
                ))}
            </div>
        </div>
    );
}