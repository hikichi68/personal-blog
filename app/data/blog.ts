import { DATE_FORMAT_JP_FULL } from '@/utils/date-formats';

// 環境変数からGraphQLのエンドポイントを取得
const GQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!GQL_ENDPOINT) {
  throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL が設定されていません。");
}

// ===============================================
// 💡 【追加】カテゴリ別記事一覧の戻り値の型定義
// ===============================================
export interface CategoryPostsData {
    categoryName: string;
    posts: PostListItem[];
}

// サイドバー用: カテゴリの型定義 (変更なし)
export interface Category {
  name: string;
  slug: string;
  count: number; // 記事数
}

// サイドバー用: 最新記事の型定義 (変更なし)
export interface RecentPost {
  title: string;
  slug: string;
}

// 投稿詳細用の型定義 (変更なし)
export interface PostDetail {
  databaseId: number;
  slug: string;
  title: string;
  date: string;
  content: string; // 本文 (HTMLコンテンツ)
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
  // カテゴリー情報 (サイドバーなどで利用可能)
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
}

// 投稿一覧の型定義 (変更なし)
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
}

// ===============================================
// 💡 【修正】カテゴリのスラッグを指定して記事一覧を取得するクエリ
// ⚠️ 変数 $slug の型を [String!] に修正しました。
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

// 💡 その他既存のクエリ
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

const GET_POST_BY_SLUG_QUERY = `
query GetPostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    databaseId
    slug
    title
    date
    content(format: RENDERED)
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

// ===============================================
// 💡 【追加】カテゴリ別記事一覧を取得するためのGraphQLクエリ
// 記事の絞り込みには where: { categoryName: "..." } を使用します。
// $slug 変数にはカテゴリのスラッグを渡します。
// ===============================================
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
// 💡 クエリ実行ロジック (変更なし)
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

// ===============================================
// 💡 【追加】カテゴリのスラッグに基づいて記事一覧を取得する関数
// ===============================================
export async function getPostsByCategorySlug(categorySlug: string): Promise<PostListItem[]> {
  try {
    const data = await fetchGraphQL<{ posts: { nodes: PostListItem[] } }>(
      GET_POSTS_BY_CATEGORY_QUERY,
      { slug: categorySlug } // 変数としてカテゴリのスラッグを渡す
    );
    // 💡 記事が0件の場合も空の配列が返る
    return data.posts.nodes;
  } catch (error) {
    console.error(`Error fetching posts by category slug: ${categorySlug}`, error);
    return []; 
  }
}


// 💡 既存の関数 (変更なし)
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

