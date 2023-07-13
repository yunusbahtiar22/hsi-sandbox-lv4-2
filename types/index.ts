import { DehydratedState } from "@tanstack/react-query";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

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
  thumbnail: URL | StaticImport;
  slug: string;
  title: string;
  summary: string;
  content: string;
}

export interface PostFilter {
  sort?: PostSort;
  page?: number;
  perPage?: number;
  categoryId?: number;
  excludedArticleId?: number;
}

export interface MetaPagination {
  page: number;
  perPage: number;
  totalPages: number;
}

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

type Slug = string;

export type PostsQueryKey = ["posts", PostFilter];
export type StaticQueryPostKey = ["post", Slug];
export type SuggestionQueryPostKey = ["suggestion", PostFilter];
export interface PrefetchQueryResult {
  dehydratedState: DehydratedState;
}
