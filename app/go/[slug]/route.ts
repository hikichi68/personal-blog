import { NextRequest, NextResponse } from 'next/server';

// 💡 テスト用の固定マップ。後ほどここをWordPress API連携に書き換えます。
const TEST_LINKS: Record<string, string> = {
  'google': 'https://www.google.com',
  'test-product': 'https://example.com/affiliate-link',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const targetUrl = TEST_LINKS[slug];

  if (!targetUrl) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 302リダイレクト（一時的な移動）
  return NextResponse.redirect(new URL(targetUrl), 302);
}