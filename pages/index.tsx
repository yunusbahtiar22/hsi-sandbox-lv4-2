import Head from "next/head";
import AppShell from "@/components/layout/appshell";
import Post from "@/components/post/post";
import type { GetServerSideProps } from "next";
import { dehydrate } from "@tanstack/react-query";
import {
  fetchPosts,
  getQueryClient,
  usePostsInfiniteQuery,
} from "@/utils/queries";
import { useRouter } from "next/router";
import type { PostSort, PrefetchQueryResult } from "@/types";
import { Box, Button, Loader, createStyles, rem } from "@mantine/core";
import Link from "next/link";

const useStyle = createStyles((theme) => ({
  button: {
    borderRadius: 30,
    minWidth: rem(204),
  },
  buttonContainer: {
    display: "grid",
    placeContent: "center",
    paddingBottom: rem(50),
  },
  link: {
    textDecoration: "none",
    color: "black",
    [`&:visited`]: {
      color: "black",
      textDecoration: "none",
    },
  },
}));

export default function Home() {
  const { classes } = useStyle();
  const { query } = useRouter();
  const sort = (query?.sort ?? "new") as PostSort;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostsInfiniteQuery({
      sort,
    });
  const posts = data?.pages.flatMap((d) => d.data);
  return (
    <>
      <Head>
        <title>Bahram</title>
        <meta name="description" content="Short Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell>
        <Box>
          {posts?.map((post) => (
            <Link key={post.id} href={post.slug} className={classes.link}>
              <Post
                title={post.title}
                author={[
                  post.author.firstName,
                  post.author.middleName,
                  post.author.lastName,
                ].join(" ")}
                category={post.category.name}
                thumbnail={post.thumbnail}
              />
            </Link>
          ))}
        </Box>
        <Box className={classes.buttonContainer}>
          {hasNextPage && (
            <Button
              variant="outline"
              size="xl"
              className={classes.button}
              onClick={() => {
                fetchNextPage();
              }}
              disabled={!hasNextPage}>
              {isFetchingNextPage ? <Loader size="md" /> : "Load More"}
            </Button>
          )}
        </Box>
      </AppShell>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PrefetchQueryResult> = async ({
  query,
}) => {
  const queryClient = getQueryClient();
  const sort: "new" | "popular" = (query.sort ?? "new") as "new" | "popular";
  await queryClient.fetchInfiniteQuery(["posts", { sort }], fetchPosts);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
