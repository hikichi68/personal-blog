// app/api/dify-chat/route.ts

export const runtime = "nodejs"; // 💡 Node.jsランタイムを強制（AxiosなしでOK）

import { NextRequest, NextResponse } from 'next/server';

const DIFY_API_ENDPOINT = "https://api.dify.ai/v1/chat-messages"; 

export async function POST(req: NextRequest) {
  const DIFY_API_KEY = process.env.MY_DIFY_API_KEY; 

  if (!DIFY_API_KEY) {
    return NextResponse.json(
      { error: "致命的エラー: Dify APIキーがVercelで取得できません。" }, 
      { status: 500 }
    );
  }

  if (!DIFY_API_KEY) {
    // このメッセージが出た場合、Vercelの設定かキャッシュの問題（サーバーログに出ないため）
    return NextResponse.json(
      { error: "致命的エラー: 新しい環境変数キーがVercelで取得できません" },
      { status: 500 }
    );
  }

  try {
    const { question } = await req.json();

    const difyPayload = {
      inputs: {},
      query: question,
      response_mode: "blocking",
      conversation_id: null, 
      user: "user-royal-chord", 
      files: []
  };

    // 💡 fetchを使用 (Edge Runtimeの制約なし)
    const difyResponse = await fetch(DIFY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DIFY_API_KEY}`, 
      },
      body: JSON.stringify(difyPayload),
      // 💡 Vercelの外部接続を安定させるための設定（任意だが推奨）
      cache: 'no-store', 
    });

    if (!difyResponse.ok) {
      // Dify APIが4xx/5xxを返した場合の処理
      const errorData = await difyResponse.json().catch(() => ({ message: 'Difyからの返答がJSONではありません。' }));
      console.error('Dify API Error:', {
        status: difyResponse.status,
        message: errorData.message,
      });
      return NextResponse.json(
        { error: `Dify API認証/リクエストエラー (Status: ${difyResponse.status}). 詳細: ${errorData.message}` },
        { status: difyResponse.status }
      );
    }

    const data = await difyResponse.json();
    const answer = data.answer || "回答が生成されませんでした。";

    return NextResponse.json({ answer });

  } catch (error) {
    // ネットワークエラーなど、予期せぬクラッシュをキャッチ
    const errorMessage = error instanceof Error ? error.message : "不明なネットワークエラー";
    console.error("CRITICAL Network/Unknown Error (FINAL CATCH):", error); 
    
    return NextResponse.json(
      { error: `サーバーエラーが発生: ${errorMessage}. Vercelログを確認してください。` },
      { status: 500 }
    );
  }
}