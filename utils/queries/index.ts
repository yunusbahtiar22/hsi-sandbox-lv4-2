import type {
  PostFilter,
  PostsQueryResult,
  PostsQueryKey,
  StaticQueryPostKey,
  Post,
  SuggestionQueryPostKey,
} from "@/types";
import {
  QueryClient,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";

export const BASE_URL = "https://hsi-sandbox.vercel.app/api/articles";

export const getQueryClient: () => QueryClient = () => new QueryClient();

export async function fetcher<Tdata>(filter: PostFilter): Promise<Tdata>;
export async function fetcher<Tdata>(filter: string): Promise<Tdata>;

export async function fetcher<TData>(filter: unknown) {
  try {
    let data: TData;
    if (typeof filter === "string") {
      const res = await fetch(`${BASE_URL}/${filter}`);
      data = await res.json();
    } else {
      const params = new URLSearchParams(filter as Record<string, string>);
      const res = await fetch(`${BASE_URL}?${params.toString()}`);
      data = await res.json();
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export const usePostsInfiniteQuery = (filter: PostFilter) => {
  return useInfiniteQuery<
    PostsQueryResult,
    unknown,
    PostsQueryResult,
    PostsQueryKey
  >(["posts", filter], fetchPosts, {
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < lastPage.meta.pagination.totalPages
        ? allPages.length + 1
        : undefined,
  });
};

export const fetchPosts: (
  ctx: QueryFunctionContext<PostsQueryKey>
) => Promise<PostsQueryResult> = async (ctx) => {
  const { sort } = ctx.queryKey[1];
  const page = ctx.pageParam ?? 1;
  const params = { ...ctx.queryKey[1], page };
  try {
    const data = await fetcher<PostsQueryResult>(params);
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchPostDetail: (
  ctx: QueryFunctionContext<StaticQueryPostKey>
) => Promise<{ data: Post }> = async (ctx) => {
  try {
    const data = await fetcher<{ data: Post }>(ctx.queryKey[1]);
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchSuggestions: (
  ctx: QueryFunctionContext<SuggestionQueryPostKey>
) => Promise<PostsQueryResult> = async (ctx) => {
  const { excludedArticleId, perPage } = ctx.queryKey[1];
  try {
    const data = await fetcher<PostsQueryResult>({
      excludedArticleId,
      perPage,
    });
    return data;
  } catch (err) {
    throw err;
  }
};
