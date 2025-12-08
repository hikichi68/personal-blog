import { DATE_FORMAT_JP_FULL } from '@/utils/date-formats';

// 環境変数からGraphQLのエンドポイントを取得
const GQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!GQL_ENDPOINT) {
  throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL が設定されていません。");
}

// ===============================================
// 型定義
// ===============================================

// 記事内のACFフィールドの型定義
export interface AcfFields {
  // --- グローバルフィールド ---
  seoMetaTitle?: string;       // JSONにはないが、通常SEO系で必要になるため枠を用意
  seoMetaDescription?: string; // 同上
  articleLeadContent?: string; // リード文
  displayTocFlag?: boolean;    // 目次表示フラグ
  affBannerUrl?: string;       // JSON: aff_banner_url
  affBannerImage?: {           // JSON: aff_banner_image
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
  cardExcerpt?: string;        // JSON: card_excerpt
  experienceLevel?: string;    // JSON: experience_level (radio button return value)

  // --- 収益特化フィールド (商品1) ---
  product1Name?: string;             // JSON: product_1_name
  product1AffLinkUrl?: string;       // JSON: product_1_aff_link_url
  product1CatchCopy?: string;        // JSON: product_1_catch_copy
  product1RecommendRating?: number;  // JSON: product1RecommendRating (camelCase in JSON definition)

  // --- 収益特化フィールド (商品2) ---
  product2Name?: string;
  product2AffLinkUrl?: string;
  product2CatchCopy?: string;
  product2RecommendRating?: number;

  // --- 収益特化フィールド (商品3) ---
  product3Name?: string;
  product3AffLinkUrl?: string;
  product3CatchCopy?: string;
  product3RecommendRating?: number;

  // --- 知識・作法特化フィールド ---
  proOnePoint?: string;        // JSON: proOnePoint
  alcoholProof?: string;       // JSON: alcohol_proof
  recipeIngredients?: string;  // JSON: recipeIngredients
  originHistory?: string;      // JSON: originHistory
}

export interface CategoryPostsData {
    categoryName: string;
    posts: PostListItem[];
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

export interface RecentPost {
  title: string;
  slug: string;
}

// 投稿詳細用の型定義 (ACFを追加)
export interface PostDetail {
  databaseId: number;
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string; // リード文の代わりやメタデータとして使用
  author: {
    node: {
      name: string;
    };
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  // ACFデータの追加 (WPGraphQLの構成により、トップレベルまたはacfフィールド下に入ります)
  // ここでは一般的な構成として、トップレベルのフィールドとしてマージされるか、
  // あるいは `acf` というオブジェクトにまとまるかを確認する必要があります。
  // 今回のクエリではトップレベル（Post直下）に展開される想定で記述しつつ、
  // クエリ側で `acf` フィールドグループとして取得する場合はここを修正します。
  // ※ここではクエリに合わせてフラットに定義します。
  
  // 実際のデータ構造に合わせてマッピングするためのインターフェース
  blogGlobalFields?: { // フィールドグループ名に基づくプロパティ
     affBannerUrl: string;
     // ...他
  };
  // 簡略化のため、クエリの返り値を直接扱う構造にします
  aff_banner_url?: string;
  card_excerpt?: string;
  experience_level?: string;
  proOnePoint?: string;
  recipeIngredients?: string;
  originHistory?: string;
  alcohol_proof?: string;
  // 商品系
  product_1_name?: string;
  product_1_aff_link_url?: string;
  product1RecommendRating?: number;
  // ...他
}

// 投稿一覧の型定義
export interface PostListItem {
  databaseId: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: {
    node: {
      name: string;
    };
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
  // 一覧表示でも使いたいACFがあればここに追加（例: 難易度など）
  experience_level?: string;
}

// ===============================================
// GraphQL クエリ
// ===============================================

const GET_POSTS_BY_CATEGORY_SLUG_QUERY = `
query GetPostsByCategorySlug($slugs: [String!]) {
  categories(where: {slug: $slugs}) {
    nodes {
      name
      posts {
        nodes {
          databaseId
          slug
          title
          date
          excerpt(format: RENDERED)
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
}
`;

const GET_ALL_POSTS_QUERY = `
query GetAllPosts {
  posts(first: 10) {
    nodes {
      databaseId
      slug
      title
      date
      excerpt(format: RENDERED)
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
}
`;

// 💡 重要: ACFフィールドを取得するためにクエリを拡張
// 注意: フィールド名はWPGraphQLの設定やプラグインのバージョンにより
// camelCase (affBannerUrl) か snake_case (aff_banner_url) か異なります。
// ここではJSONの "graphql_field_name" に基づき記述しますが、
// エラーが出る場合は WordPress管理画面の GraphiQL IDE で正しいフィールド名を確認してください。
const GET_POST_BY_SLUG_QUERY = `
query GetPostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    databaseId
    slug
    title
    date
    content(format: RENDERED)
    excerpt(format: RENDERED)
    author {
      node {
        name
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
    
    # --- ACF Global Fields ---
    aff_banner_url
    card_excerpt
    experience_level
    
    # --- ACF Revenue Fields (Product 1) ---
    product_1_name
    product_1_aff_link_url
    product_1_catch_copy
    product1RecommendRating
    
    # --- ACF Revenue Fields (Product 2) ---
    product_2_name
    product_2_aff_link_url
    product_2_catch_copy
    product_2_recommend_rating
    
    # --- ACF Revenue Fields (Product 3) ---
    product_3_name
    product_3_aff_link_url
    product_3_catch_copy
    product_3_recommend_rating

    # --- ACF Knowledge Fields ---
    proOnePoint
    alcohol_proof
    recipeIngredients
    originHistory
  }
}
`;

const GET_ALL_POST_SLUGS_QUERY = `
query GetAllPostSlugs {
  posts(first: 100) {
    nodes {
      slug
    }
  }
}
`;

const GET_RECENT_POSTS_QUERY = `
query GetRecentPosts {
  posts(first: 5, where: {orderby: {field: DATE, order: DESC}}) {
    nodes {
      title
      slug
    }
  }
}
`;

const GET_ALL_CATEGORIES_QUERY = `
query GetAllCategories {
  categories(where: {exclude: "1", hideEmpty: true}) {
    nodes {
      name
      slug
      count
    }
  }
}
`;

const GET_POSTS_BY_CATEGORY_QUERY = `
query GetPostsByCategory($slug: String!) {
  posts(first: 10, where: {categoryName: $slug}) {
    nodes {
      databaseId
      slug
      title
      date
      excerpt(format: RENDERED)
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
}
`;

// ===============================================
// クエリ実行ロジック
// ===============================================

async function fetchGraphQL<T>(query: string, variables = {}): Promise<T> {
  const response = await fetch(GQL_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    console.error("GraphQL Request Failed:", response.statusText);
    throw new Error(`Failed to fetch GraphQL data: ${response.statusText}`);
  }

  const result = await response.json();
  
  if (result.errors) {
    console.error("GraphQL Errors:", result.errors);
    throw new Error(`GraphQL errors occurred: ${result.errors.map((e: any) => e.message).join(', ')}`);
  }

  return result.data as T;
}

export async function getPostsByCategorySlug(categorySlug: string): Promise<PostListItem[]> {
  try {
    const data = await fetchGraphQL<{ posts: { nodes: PostListItem[] } }>(
      GET_POSTS_BY_CATEGORY_QUERY,
      { slug: categorySlug }
    );
    return data.posts.nodes;
  } catch (error) {
    console.error(`Error fetching posts by category slug: ${categorySlug}`, error);
    return []; 
  }
}

export async function getAllPosts(): Promise<PostListItem[]> {
  try {
    const data = await fetchGraphQL<{ posts: { nodes: PostListItem[] } }>(
      GET_ALL_POSTS_QUERY
    );
    return data.posts.nodes;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return []; 
  }
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    const data = await fetchGraphQL<{ post: PostDetail }>(
      GET_POST_BY_SLUG_QUERY,
      { slug }
    );
    return data.post;
  } catch (error) {
    console.error(`Error fetching post by slug: ${slug}`, error);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  try {
    const data = await fetchGraphQL<{ posts: { nodes: { slug: string }[] } }>(
      GET_ALL_POST_SLUGS_QUERY
    );
    return data.posts.nodes;
  } catch (error) {
    console.error("Error fetching all post slugs:", error);
    return [];
  }
}

export async function getRecentPosts(): Promise<RecentPost[]> {
    try {
        const data = await fetchGraphQL<{ posts: { nodes: RecentPost[] } }>(
            GET_RECENT_POSTS_QUERY
        );
        return data.posts.nodes;
    } catch (error) {
        console.error("Error fetching recent posts:", error);
        return [];
    }
}

export async function getAllCategories(): Promise<Category[]> {
    try {
        const data = await fetchGraphQL<{ categories: { nodes: Category[] } }>(
            GET_ALL_CATEGORIES_QUERY
        );
        return data.categories.nodes.filter(cat => cat.count > 0);
    } catch (error) {
        console.error("Error fetching all categories:", error);
        return [];
    }
}