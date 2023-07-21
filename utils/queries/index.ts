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
}

export const usePostsInfiniteQuery = (filter: PostFilter) => {
  return useInfiniteQuery<
    PostsQueryResult,
    unknown,
    PostsQueryResult,
    PostsQueryKey
  >(["posts", filter], fetchPosts, {
    keepPreviousData: true,
    getNextPageParam: ({ meta: { pagination } }) =>
      pagination.page < pagination.totalPages ? pagination.page + 1 : undefined,
  });
};

export const fetchPosts: (
  ctx: QueryFunctionContext<PostsQueryKey>
) => Promise<PostsQueryResult> = async (ctx) => {
  const page = ctx.pageParam ?? 1;
  const params = { ...ctx.queryKey[1], page };
  const data = await fetcher<PostsQueryResult>(params);
  return data;
};

export const fetchPostDetail: (
  ctx: QueryFunctionContext<StaticQueryPostKey>
) => Promise<{ data: Post }> = async (ctx) => {
  const data = await fetcher<{ data: Post }>(ctx.queryKey[1]);
  return data;
};

export const fetchSuggestions: (
  ctx: QueryFunctionContext<SuggestionQueryPostKey>
) => Promise<PostsQueryResult> = async (ctx) => {
  const { excludedArticleId, perPage } = ctx.queryKey[1];

  const data = await fetcher<PostsQueryResult>({
    excludedArticleId,
    perPage,
  });
  return data;
};
