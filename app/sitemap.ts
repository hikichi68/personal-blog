import { MetadataRoute } from 'next';
import { getAllPosts } from '@/app/data/blog'; // 以前作った全記事取得関数を利用

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://blog.barhik.tokyo';

  // 1. WordPressから全記事を取得
  const posts = await getAllPosts();

  // 2. 記事のURLリストを作成
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  // 3. 固定ページのURL（トップ、プロフィールなど）
  const routes = ['', '/blog', '/profile'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...postUrls];
}