import "server-only";

// Next.jsの環境変数からGraphQLエンドポイントを取得
const GQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

// エンドポイントが設定されていない場合はエラーをコンソールに出力
if (!GQL_ENDPOINT) {
  console.error("❌ Critical Error: NEXT_PUBLIC_WORDPRESS_API_URL is not configured.");
}

const GET_ALL_GALLERY_ITEMS_QUERY = `
  query GetAllGalleryItems {
    photoGalleryItems(first: 100) {
      nodes {
        databaseId
        title
        galleryDetails {
          imageField {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

/**
 * ギャラリーアイテムをGraphQLエンドポイントから取得します。
 * ネットワークエラーやGraphQLエラーに対応するためのリトライロジックを含みます。
 * @returns ギャラリーアイテムのノード配列、またはエラー時は空の配列
 */
export async function getAllGalleryItems() {
  if (!GQL_ENDPOINT) return [];

  const maxRetries = 3;
  let delay = 1000;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(GQL_ENDPOINT, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          next: { revalidate: 3600 },
          body: JSON.stringify({
              query: GET_ALL_GALLERY_ITEMS_QUERY,
          }),
      });

      const result = await response.json();
      
      if (result.errors) {
        // GraphQLクエリ自体のエラーをコンソールに表示し、処理を中断
        console.error("GraphQL Errors in Response:", result.errors);
        return []; 
      }
      
      return result.data?.photoGalleryItems?.nodes || [];

    } catch (error) {
      // ネットワーク接続などのエラーの場合
      if (i < maxRetries - 1) {
        // リトライ前の待機（指数関数的バックオフ）
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        // 最大リトライ回数を超えた場合
        console.error("Error fetching gallery items after max retries:", error);
      }
    }
  }

  // 最終的に取得できなかった場合は空の配列を返す
  return [];
}