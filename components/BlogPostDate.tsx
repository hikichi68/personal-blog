import React from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
// 💡 @/utils は、tsconfig.json で設定されたエイリアスを使用
import { DATE_FORMAT_JP_FULL } from '@/utils/date-formats'; 

interface BlogPostDateProps {
  // APIから取得した日付文字列 (例: "2025-11-14T10:00:00Z")
  dateString: string; 
  // 💡 オプションとして、別の形式も指定できるように追加
  formatType?: string; 
}

/**
 * ブログの投稿日を指定された形式で表示するコンポーネント
 * @param dateString - ISO形式の日付文字列
 * @param formatType - date-formats.ts で定義した形式（省略時は DATE_FORMAT_JP_FULL）
 */
export const BlogPostDate: React.FC<BlogPostDateProps> = ({ 
  dateString, 
  formatType = DATE_FORMAT_JP_FULL // デフォルト形式を設定
}) => {
  // 1. Dateオブジェクトに変換
  const date = new Date(dateString);

  // 2. format関数を使って、定義された形式に変換
  const formattedDate = format(date, formatType, { locale: ja });

  return (
    // <time>タグはSEO上、日付を扱う際に推奨されます
    <time dateTime={dateString} className="text-sm text-gray-500">
      公開日: {formattedDate}
    </time>
  );
};

// 💡 ページで利用する際は、エクスポートされた BlogPostDate をインポートします
// 例: import { BlogPostDate } from '@/components/BlogPostDate';