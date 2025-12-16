import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const BASE_URL = process.env.CF7_API_BASE_URL;
    const FORM_ID = process.env.CF7_FORM_ID;

    if (!BASE_URL || !FORM_ID) {
        console.error("サーバー設定エラー: CF7_API_BASE_URL または CF7_FORM_ID が設定されていません");
        return NextResponse.json(
            { message: 'Server configuration error (Missing CF7 ENV variables)' }, 
            { status: 500 }
        );
    }

    // 1. CF7エンドポイントの構築
    const CF7_ENDPOINT = `${BASE_URL.replace(/\/$/, '')}/${FORM_ID}/feedback`;
    console.log(`[CF7] Target Endpoint: ${CF7_ENDPOINT}`); 

    try {
        const formData = await request.formData();

        // 💡 必須修正ポイント：CF7のユニットタグを追加
        // このフィールドがないと 'wpcf7_unit_tag_not_found' エラーになります。
        // 値はユニークであれば何でもOKです。
        formData.append('_wpcf7_unit_tag', `wpcf7-f${FORM_ID}-o1`); // シンプルな形式で代用

        // デバッグ情報 (FormDataの中身をオブジェクトとして表示)
        const dataLog: { [key: string]: FormDataEntryValue } = {};
        for (const [key, value] of formData.entries()) {
            dataLog[key] = value;
        }
        console.log("[CF7] Sending Data with Unit Tag:", dataLog);
        
        // 2. WordPress (Contact Form 7) にデータを転送
        const cf7Response = await fetch(CF7_ENDPOINT, {
            method: 'POST',
            body: formData,
            // 💡 CF7への送信には認証ヘッダーは不要
        });

        // 3. CF7からのレスポンスを解析
        const cf7Data = await cf7Response.json();

        // 4. 結果の判定
        if (cf7Data.status === 'mail_sent') {
             // 成功
            console.log("[CF7] Mail Sent Successfully.");
            return NextResponse.json({ message: 'Success', data: cf7Data }, { status: 200 });
        } else {
            // CF7のバリデーションエラー ('validation_error') やその他のエラー
            console.error('CF7通信失敗またはバリデーションエラー:', cf7Data);
            
            // CF7が400を返す場合もあるため、wpStatusを添えて400を返す
            return NextResponse.json(
                { 
                    message: 'Submission failed or validation error', 
                    details: cf7Data,
                    wpStatus: cf7Response.status 
                }, 
                { status: 400 } 
            );
        }

    } catch (error) {
        console.error('API Error (Fetch or JSON parsing error):', error);
        return NextResponse.json(
            { message: 'Internal Server Error (Network or Parsing issue)' }, 
            { status: 500 }
        );
    }
}