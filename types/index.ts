export type URL = string;

export interface Category {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

export type PostSort = "new" | "popular";

export interface Post {
  id: number;
  category: Category;
  author: Author;
  thumbnail: URL;
  slug: string;
  title: string;
  summary: string;
}

export interface PostFilter {
  sort?: PostSort;
  page?: number;
  perPage?: number;
  categoryId?: number;
  excludedArticleId?: number;
}

export type MetaPagination = {
  page: number;
  perPage: number;
  totalPages: number;
};

export interface PostsMeta {
  pagination: MetaPagination;
  sort: PostSort;
  categoryId: number;
  exculdedArticleId: number;
}

export type PostsData = Post[];

export interface PostsQueryResult {
  meta: PostsMeta;
  data: PostsData;
}
