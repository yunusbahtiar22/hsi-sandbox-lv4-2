import Head from "next/head";
import Link from "next/link";
import AppShell from "@/components/layout/appshell";
import Image from "next/image";
import RelatedCard from "@/components/post/related/post";
import {
  Box,
  Title,
  Text,
  Group,
  Button,
  Loader,
  createStyles,
  rem,
  MantineTheme,
} from "@mantine/core";
import { dehydrate } from "@tanstack/react-query";
import {
  fetcher,
  getQueryClient,
  fetchPosts,
  usePostsInfiniteQuery,
} from "@/utils/queries";
import type { Post, PrefetchQueryResult } from "@/types";
import type { GetServerSideProps } from "next";

interface RelatesPageProps {
  article: Post;
}

const useStyle = createStyles((theme: MantineTheme) => ({
  mainArticle: {
    paddingTop: rem(37),
  },
  mainImage: {
    width: rem(200),
    height: rem(227),
    position: "relative",
    borderRadius: rem(10),
    overflow: "hidden",
    [theme.fn.smallerThan("sm")]: {
      marginRight: "auto",
      marginLeft: "auto",
    },
  },
  mainContentWrapper: {
    width: "70%",
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
      paddingLeft: rem(16),
      paddingRight: rem(16),
    },
  },
  mainHeading: {
    fontWeight: 700,
    fontSize: rem(36),
    lineHeight: rem(58),
    color: theme.colors.gray[7],
    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
      lineHeight: rem(42),
    },
  },
  mainContent: {
    fontSize: rem(18),
    lineHeight: rem(32),
    fontWeight: 600,
    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(16),
      lineHeight: rem(24),
    },
  },
  mainWrapper: {
    marginBottom: rem(156),
    [theme.fn.smallerThan("sm")]: {
      marginBottom: rem(60),
    },
  },
  articleLink: {
    textDecoration: "none",
    color: "black",
    [`&:visited`]: {
      color: "black",
      textDecoration: "none",
    },
  },
  buttonContainer: {
    display: "grid",
    placeContent: "center",
    paddingBottom: rem(50),
  },
  button: {
    borderRadius: 30,
    minWidth: rem(204),
  },
}));

export default function RelatesPage({ article }: RelatesPageProps) {
  const { classes } = useStyle();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    usePostsInfiniteQuery({
      excludedArticleId: article.id,
    });
  const relatedPosts = data?.pages.flatMap((d) => d.data);
  console.log("[data] : ", relatedPosts);
  return (
    <>
      <Head>
        <title>Related Post</title>
        <meta name="description" content="Short Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell>
        <Box className={classes.mainWrapper}>
          <Title
            sx={(theme: MantineTheme) => ({
              fontWeight: 700,
              fontSize: rem(36),
              lineHeight: rem(58),
              [theme.fn.smallerThan("sm")]: {
                fontSize: rem(24),
                lineHeight: rem(32),
              },
            })}
            order={4}>
            Related Post List
          </Title>
          <Group className={classes.mainArticle} align="start" spacing={49}>
            <Box className={classes.mainImage}>
              <Image src={article.thumbnail} alt="" fill />
            </Box>
            <Box className={classes.mainContentWrapper}>
              <Title className={classes.mainHeading} order={2}>
                {article.title}
              </Title>
              <Text component="p" className={classes.mainContent}>
                {article.summary}
              </Text>
            </Box>
          </Group>
        </Box>
        <Box>
          {relatedPosts?.map((post, idx) => (
            <Link
              className={classes.articleLink}
              href={`/${post.slug}`}
              key={post.title}>
              <RelatedCard
                author={[
                  post?.author.firstName,
                  post?.author.middleName,
                  post?.author.lastName,
                ].join(" ")}
                title={post.title}
                summary={post.summary}
                category={post.category.name}
                thumbnail={post.thumbnail}
                index={idx + 1}
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

export const getServerSideProps: GetServerSideProps<
  PrefetchQueryResult
> = async (ctx) => {
  const { slug } = ctx.query;
  const queryClient = getQueryClient();
  // await queryClient.fetchQuery(["post", slug as string], fetchPostDetail);
  const { data } = await fetcher<{ data: Post }>(slug as string);
  await queryClient.fetchInfiniteQuery(
    ["posts", { excludedArticleId: data.id }],
    fetchPosts
  );
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      article: data,
    },
  };
};
