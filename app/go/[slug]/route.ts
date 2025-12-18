import { NextRequest, NextResponse } from 'next/server';

const AFFILIATE_LINKS: Record<string, string> = {
    'test-google': 'https://www.google.com',
    'amazon-test': 'https://www.amazon.co.jp',
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const targetUrl = AFFILIATE_LINKS[slug];

    if (!targetUrl) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 302リダイレクトで飛ばす
    return NextResponse.redirect(new URL(targetUrl), 302);
}