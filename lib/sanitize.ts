import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// サーバーサイドで実行されるため、JSDOMを使ってWindowオブジェクトを作成
const window = new JSDOM('').window;
const purify = DOMPurify(window);

export function sanitizeHtml(html: string): string {
    // WordPressの本文をサニタイズ（クリーンアップ）して安全にします
    return purify.sanitize(html);
}