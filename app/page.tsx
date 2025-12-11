import Link from 'next/link';
import Hero from '@/components/Hero'; 
import { getAllPosts, PostListItem } from './data/blog';
import { BlogPostCard } from '@/components/BlogPostCard';

// トップページ（ヒーロー＆簡単な紹介）コンポーネント
export default async function Home() {
    // 💡 最新記事の取得 (最大3件表示を想定)
    const allPosts: PostListItem[] = await getAllPosts();
    const recentPosts = allPosts.slice(0, 3); // 最新の3件をピックアップ

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 1. ヒーローセクション */}
            <Hero
                title="The Bartenders Memoir"
                subtitle="カクテルの知識、お酒の作法、プロが教えるバーの世界"
                imageOn
            />

            {/* 2. ブログ紹介セクション */}
            <main id="blog-introduction" className="container mx-auto p-8 pt-16 max-w-6xl">
                <div className="bg-white p-10 rounded-xl shadow-2xl border-t-4 border-red-600">
                    <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6 text-center">
                        <span className="text-red-700">|</span> 知識と作法を深める、バーテンダーの教養ブログ
                    </h2>

                    <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
                        このブログは、現役バーテンダーが、お酒をより深く楽しむための知識や、
                        知っておきたいバーでのスマートな作法を共有する場です。
                        カクテルレシピ、ウイスキーの基礎知識、プロの視点など、
                        あなたの「一杯」をさらに豊かにするための情報を発信しています。
                    </p>

                    <div className="flex justify-center space-x-4">
                        <Link 
                            href="/blog" 
                            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition duration-300"
                        >
                            ブログ記事一覧へ &rarr;
                        </Link>
                        <Link 
                            href="/profile" // 💡 Profileへの導線も追加
                            className="px-6 py-3 border border-gray-400 text-gray-800 font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                        >
                            バーテンダーのプロフィール
                        </Link>
                    </div>
                </div>
            </main>

            {/* 3. 最新記事セクションの追加 */}
            <section id="recent-posts" className="container mx-auto p-8 pt-12 max-w-6xl">
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8 border-b border-gray-300 pb-3">
                    📢 最新ブログ記事
                </h2>
                
                {recentPosts.length > 0 ? (
                    <div className="space-y-8">
                        {/* 💡 BlogPostCard を利用して最新記事を表示 */}
                        {recentPosts.map((post) => (
                            <BlogPostCard key={post.databaseId} post={post} />
                        ))}
                    </div>
                ) : (
                    <p className="text-lg text-gray-600 text-center py-10">現在、公開されている記事はありません。</p>
                )}
                
                <div className="text-center mt-12">
                    <Link 
                        href="/blog" 
                        className="inline-flex items-center text-red-600 hover:text-red-700 transition font-semibold p-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200"
                    >
                        全ての記事を見る ( {allPosts.length} 件 ) &rarr;
                    </Link>
                </div>
            </section>
        </div>
    );
}