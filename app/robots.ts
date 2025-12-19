import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/go/', // 💡 アフィリエイトリダイレクト用URLはクロール不要
    },
    sitemap: 'https://blog.barhik.tokyo/sitemap.xml',
  };
}