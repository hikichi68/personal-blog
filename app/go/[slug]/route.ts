import { NextRequest, NextResponse } from 'next/server';

// 本来はデータベースやWordPressのカスタム投稿タイプから取得するのが理想ですが、
// まずは管理しやすい「マップ形式」で実装します。
const AFFILIATE_LINKS: Record<string, string> = {
    'amazon-whisky': 'https://amzn.to/xxxxxxx', // 実際のリンク
    'rakuten-shaker': 'https://hb.afl.rakuten.co.jp/xxxxxxx',
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> } // App Routerの型定義
) {
    const { slug } = await params;
    const targetUrl = AFFILIATE_LINKS[slug];

    if (!targetUrl) {
        // リンクが存在しない場合はトップページか404へ
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 💡 アフィリエイトリンクへのリダイレクト
    // SEOへの影響を考慮し、検索エンジンにインデックスさせない302(一時的)リダイレクトを使用
    return NextResponse.redirect(new URL(targetUrl), 302);
}