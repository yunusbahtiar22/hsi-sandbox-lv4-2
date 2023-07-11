import { Post, PostFilter, PostsQueryResult } from "@/types";
import {
  QueryClient,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";

const BASE_URL = "https://hsi-sandbox.vercel.app/api/articles";

type QueryPostsKey = ["posts", PostFilter];

export const getQueryClient: () => QueryClient = () => new QueryClient();

export const usePostsInfiniteQuery = (filter: PostFilter) => {
  return useInfiniteQuery<
    PostsQueryResult,
    unknown,
    PostsQueryResult,
    QueryPostsKey
  >(["posts", filter], fetchPosts, {
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < lastPage.meta.pagination.totalPages
        ? allPages.length + 1
        : undefined,
  });
};

export const fetchPosts: (
  ctx: QueryFunctionContext<QueryPostsKey>
) => Promise<PostsQueryResult> = async (ctx) => {
  const { sort } = ctx.queryKey[1];
  const page = ctx.pageParam ?? 1;
  try {
    const res = await fetch(`${BASE_URL}?page=${page}&sort=${sort}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
