import { NextRequest, NextResponse } from 'next/server';
import { getAffiliateUrlBySlug } from '@/app/data/blog';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // 1. WordPressからURLを自動取得
  const targetUrl = await getAffiliateUrlBySlug(slug);

  if (!targetUrl) {
    // 見つからない場合はトップページへ
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. 取得したURLへ302リダイレクト
  return NextResponse.redirect(new URL(targetUrl), 302);
}