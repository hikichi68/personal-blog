import React from 'react';
import Link from 'next/link';
import { PostListItem } from '@/app/data/blog';
import { BlogPostDate } from '@/components/BlogPostDate';

interface BlogPostCardProps {
  post: PostListItem;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  // 💡 優先度: ACFのカード要約 > 標準のExcerpt
  // ACFの要約があればそれを使い、なければHTMLタグを除去した標準Excerptを使うなどの処理
  const displayExcerpt = post.globalFields?.card_excerpt 
    ? post.globalFields.card_excerpt
    : post.excerpt; // 標準ExcerptはHTMLが含まれるため、dangerouslySetInnerHTMLを使用

  // 💡 体験談レベル (1~5) を星で表示するヘルパー
  const renderLevel = (levelStr?: string) => {
    if (!levelStr) return null;
    const level = parseInt(levelStr, 10);
    if (isNaN(level)) return null;

    return (
      <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded shadow text-sm font-bold text-gray-700 z-10">
        Lv.{level} <span className="text-yellow-500">{"★".repeat(level)}{"☆".repeat(5 - level)}</span>
      </div>
    );
  };

  return (
    <article className="bg-white p-6 rounded-lg shadow-xl border-l-4 border-red-700 hover:border-red-900 transition duration-300 relative">
      
      {/* 💡 レベル表示（あれば） */}
      {renderLevel(post.globalFields?.experience_level)}

      <Link href={`/blog/${post.slug}`} passHref className="block group">
        {post.featuredImage && (
          <div className="overflow-hidden rounded mb-4">
            <img 
              src={post.featuredImage.node.sourceUrl} 
              alt={post.featuredImage.node.altText || post.title} 
              className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-500"
            />
          </div>
        )}
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2 group-hover:text-red-700 transition duration-150">
          {post.title}
        </h2>
      </Link>
      
      <div className="flex items-center gap-2 mb-3">
        <BlogPostDate dateString={post.date} />
        <span className="text-gray-400 text-sm">|</span>
        <p className="text-sm text-gray-500">著者: {post.author.node.name}</p>
      </div>

      <div className="text-gray-700 mt-3 excerpt-content">
        {/* ACFの要約がある場合はテキストとして、標準の場合はHTMLとして表示 */}
        {post.globalFields?.card_excerpt ? (
           <p className="line-clamp-3">{post.globalFields.card_excerpt}</p>
        ) : (
           <div dangerouslySetInnerHTML={{ __html: post.excerpt }} className="line-clamp-3" />
        )}
      </div>
      
      <Link 
        href={`/blog/${post.slug}`} 
        className="mt-4 inline-block text-red-600 hover:text-red-800 font-medium transition duration-150"
      >
        続きを読む &rarr;
      </Link>
    </article>
  );
};