// 💡 修正: GQL_ENDPOINTの定義を、環境変数から読み込むように変更
// Next.jsのServer Componentから環境変数を使うため、NEXT_PUBLIC_ が必要
const GQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!GQL_ENDPOINT) {
  // 環境変数が設定されていない場合のエラー
  console.error("❌ 環境変数 NEXT_PUBLIC_WORDPRESS_API_URL が設定されていません。");
  // 開発環境用にフォールバックURLを設定（本番環境ではエラーが望ましい）
  // throw new Error("API endpoint is not defined.");
}

// =================================================================
// 1. メニュー詳細データを1件だけ取得するクエリ
// =================================================================
const GET_MENU_DETAIL_QUERY = `
  query GetMenuDetail($id: ID!) {
    foodItem(id: $id, idType: SLUG) {
      title
      content
      slug
      menuCategories {
        nodes {
          name
        }
      }
      menuFields {
        price
        isseasonal
        allergy
        isRecommended
        menuphoto {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export async function getMenuDetail(slug: string) {
  if (!GQL_ENDPOINT) return null;

  try {
    const response = await fetch(GQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 3600 },
      body: JSON.stringify({
        query: GET_MENU_DETAIL_QUERY,
        variables: { id: slug }
      }),
    });

    const result = await response.json();

    if (result.errors || !result.data?.foodItem) {
      console.error("GraphQL Errors or No Data:", result.errors);
      return null;
    }

    return result.data.foodItem;

  } catch (error) {
    console.error("Error fetching menu detail:", error);
    return null;
  }
}

// =================================================================
// 2. メニュー一覧を取得するクエリ（全件取得用）
// =================================================================
const ALL_MENU_ITEMS_QUERY = `
  query AllMenuItems {
    foodItems(first: 100) { # 最大100件まで取得
      nodes {
        databaseId
        slug
        title
        content
        menuCategories {
          nodes {
            name
            slug
          }
        }
        menuFields {
          price
          isseasonal
          allergy
          isRecommended
          menuphoto {
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

// カテゴリスラッグに基づいてメニューアイテムを取得する (Next.js側でフィルタリング)
export async function getMenuItemsByCategory(categorySlug: string) {
  if (!GQL_ENDPOINT) return [];

  try {
      // 1. 全てのメニューアイテムを取得
      const res = await fetch(GQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
        body: JSON.stringify({
          query: ALL_MENU_ITEMS_QUERY,
        }),
      });

      const json = await res.json();
      
      if (json.errors) {
        console.error("❌ GraphQL Error Details:", JSON.stringify(json.errors, null, 2));
        // エラー時は呼び出し元で処理できるよう throw する
        throw new Error('Failed to fetch all menu items due to GraphQL error.');
      }
      
      const allItems = json.data.foodItems.nodes;

      // 2. Next.jsのコード内で、現在のカテゴリのスラッグに一致するものをフィルタリング
      const filteredItems = allItems.filter((item: any) => 
        item.menuCategories.nodes.some((cat: any) => cat.slug === categorySlug)
      );
      
      return filteredItems;
      
  } catch (error) {
      console.error("Error fetching or filtering menu items:", error);
      // エラーを再スローし、呼び出し元 (page.tsx) の try...catch でキャッチさせる
      throw error; 
  }
}

// =================================================================
// 3. おすすめメニューのみを取得する関数 (トップページ用)
// =================================================================
export async function getRecommendedItems() {
  if (!GQL_ENDPOINT) return [];

  try {
      // 全件取得
      const res = await fetch(GQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
        body: JSON.stringify({
          query: ALL_MENU_ITEMS_QUERY,
        }),
      });

      const json = await res.json();
      
      if (json.errors) {
        console.error("❌ GraphQL Error Details (Recommended):", JSON.stringify(json.errors, null, 2));
        return [];
      }
      
      const allItems = json.data.foodItems.nodes;

      // isRecommended が true のものをフィルタリング
      const recommendedItems = allItems.filter((item: any) => 
        item.menuFields?.isRecommended === true || item.menuFields?.isRecommended === 1
      );
      
      // おすすめは最大3つに絞り込む
      return recommendedItems.slice(0, 3);
      
  } catch (error) {
      console.error("Error fetching recommended items:", error);
      return [];
  }
}

// =================================================================
// 4. 全てのメニューを取得する関数 (メニューインデックスページ用 /menu)
// =================================================================
export async function getAllMenuItems() {
  if (!GQL_ENDPOINT) return [];

  try {
      const res = await fetch(GQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
        body: JSON.stringify({
          query: ALL_MENU_ITEMS_QUERY,
        }),
      });

      const json = await res.json();
      
      if (json.errors) {
        console.error("❌ GraphQL Error Details (All Menu):", JSON.stringify(json.errors, null, 2));
        return [];
      }
      
      // フィルタリングせずに全ノードを返す
      return json.data.foodItems.nodes;
      
  } catch (error) {
      console.error("Error fetching all menu items:", error);
      return [];
  }
}