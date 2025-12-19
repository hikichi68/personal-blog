/**
 * サイト全体で使用する日付形式の定数を定義します。
 * date-fns の format 関数で使用する形式です。
 * yyyy: 年 (4桁), MM: 月 (2桁), dd: 日 (2桁), EEE: 曜日 (短縮形)
 */

// 1. ブログ投稿日などでよく使う「YYYY年MM月DD日」形式
export const DATE_FORMAT_JP_FULL = 'yyyy年MM月dd日';

// 以下のフォーマットは現在未使用ですが、将来的に使用する可能性があるため残しています
// 2. ブログ一覧やフッターなどで使う簡潔な形式「YYYY/MM/DD」
// export const DATE_FORMAT_SLASH = 'yyyy/MM/dd';

// 3. 英語圏で通用する形式「MMM dd, yyyy」
// export const DATE_FORMAT_ENG = 'MMM dd, yyyy';

// 4. 年月日と曜日を含む形式
// export const DATE_FORMAT_WITH_DAY = 'yyyy年MM月dd日 (EEE)';