import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/go/', // 💡 アフィリエイトリダイレクト用URLはクロール不要
    },
    sitemap: 'https://barhik.tokyo/sitemap.xml',
  };
}