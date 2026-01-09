const GQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!GQL_ENDPOINT) {
  throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL が設定されていません。");
}

// ===============================================
// 型定義
// ===============================================

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
  date: string;
  author: {
    node: {
      name: string;
    };
  };
}

export interface PostDetail {
  databaseId: number;
  slug: string;
  title: string;
  date: string;
  content: string;
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
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };

  globalFields?: {
    aff_banner_url?: string;
    aff_banner_image?: {node: {sourceUrl: string;};} | null;
    card_excerpt?: string;
    experience_level?: string;
 };
 
 revenueReviewFields?: {
   product_1_name?: string;
   product_1_image?: string | null;
   product_1_aff_link_url?: string;
   product_1_impression_tag?: string;
   product_1_redirect_slug?: string;
   product_1_catch_copy?: string;
   product_1_recommendRating?: number;
   
   product_2_name?: string;
   product_2_image?: string | null;
   product_2_aff_link_url?: string;
   product_2_impression_tag?: string;
   product_2_redirect_slug?: string;
   product_2_catch_copy?: string;
   product_2_recommend_rating?: number;

   product_3_name?: string;
   product_3_image?: string | null;
   product_3_aff_link_url?: string;
   product_3_impression_tag?: string;
   product_3_redirect_slug?: string;
   product_3_catch_copy?: string;
   product_3_recommend_rating?: number;
 };
 
 knowledgeMannersFields?: {
   proOnePoint?: string;
   recipeIngredients?: string;
   originHistory?: string;
   alcohol_proof?: string;
 };
}

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
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  }
  globalFields?: {
    card_excerpt?: string;
    experience_level?: string;
  };
}

export interface BlogCardItem {
  id: number;
  title: string;
  slug: string;
  date: string;
  authorName: string;
  imageUrl: string;
  categoryName: string | null;
}

// ===============================================
// GraphQL クエリ
// ===============================================
const GET_ALL_POSTS_QUERY = `
query GetAllPosts {
  posts(first: 1000) {
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
      categories {
        nodes {
          name
          slug
        }
      }
      globalFields {
        card_excerpt
        experience_level
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
    globalFields {
      aff_banner_url
      aff_banner_image {
        node {
          sourceUrl
        }
      }
      card_excerpt
      experience_level
    }
    revenueReviewFields {
      product_1_name
      product_1_image
      product_1_aff_link_url
      product_1_impression_tag
      product_1_redirect_slug
      product_1_catch_copy
      product_1_recommendRating
      product_2_name
      product_2_image
      product_2_aff_link_url
      product_2_impression_tag
      product_2_redirect_slug
      product_2_catch_copy
      product_2_recommend_rating
      product_3_name
      product_3_image
      product_3_aff_link_url
      product_3_impression_tag
      product_3_redirect_slug
      product_3_catch_copy
      product_3_recommend_rating
    }
    knowledgeMannersFields {
      proOnePoint
      alcohol_proof
      recipeIngredients
      originHistory
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
      date
      author {
        node {
          name
        }
      }
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
      categories {
        nodes {
          name
          slug
        }
      }
      globalFields {
        card_excerpt
        experience_level
      }
    }
  }
}
`;

// ===============================================
// クエリ実行ロジック
// ===============================================

async function fetchGraphQL<T>(query: string, variables = {}): Promise<T> {
  // ✅ next.revalidate を 3600秒 (1時間) に統一
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

export async function getAllBlogCards(): Promise<BlogCardItem[]> {
  try {
    const data = await fetchGraphQL<{ posts: { nodes: PostListItem[] } }>(
      GET_ALL_POSTS_QUERY
    );
    
    return data.posts.nodes.map(post => {
        const imgNode = post.featuredImage?.node;
        const imageUrl = imgNode?.sourceUrl || 'https://placehold.co/600x400/png?text=No+Image';
        
        const categoryName = post.categories?.nodes && post.categories.nodes.length > 0
            ? post.categories.nodes[0].name
            : null;

        return {
            id: post.databaseId,
            title: post.title,
            slug: post.slug,
            date: post.date,
            authorName: post.author.node.name,
            imageUrl: imageUrl,
            categoryName: categoryName,
        };
    });
  } catch (error) {
    console.error("Error fetching all blog cards:", error);
    return []; 
  }
}

export async function getAffiliateUrlBySlug(slug: string): Promise<string | null> {
  const query = `
    query GetAllAffiliateLinks {
      posts(first: 100) {
        nodes {
          revenueReviewFields {
            product_1_redirect_slug
            product_1_aff_link_url
            product_2_redirect_slug
            product_2_aff_link_url
            product_3_redirect_slug
            product_3_aff_link_url
          }
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL<{ posts: { nodes: any[] } }>(query);
    
    for (const post of data.posts.nodes) {
      const rev = post.revenueReviewFields;
      if (!rev) continue;
      if (rev.product_1_redirect_slug === slug) return rev.product_1_aff_link_url;
      if (rev.product_2_redirect_slug === slug) return rev.product_2_aff_link_url;
      if (rev.product_3_redirect_slug === slug) return rev.product_3_aff_link_url;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function searchPosts(searchTerm: string) {
  const query = `
    query SearchPosts($searchTerm: String!) {
      posts(where: { search: $searchTerm }, first: 10) {
        nodes {
          title
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ posts: { nodes: any[] } }>(query, { searchTerm });
  return data.posts.nodes;
}