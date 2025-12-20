const BLOCKED_TAGS = /<(script|iframe|object|embed|form)[^>]*>[\s\S]*?<\/\1>/gi;

export async function sanitizeHtml(html: string): Promise<string> {
  if (!html) return '';
  
  // 1. 危険なタグとその中身を削除
  let sanitized = html.replace(BLOCKED_TAGS, '');
  
  // 2. インラインイベント（onclick等）を削除
  sanitized = sanitized.replace(/\sone\w+="[^"]*"/g, '');

  return sanitized;
}