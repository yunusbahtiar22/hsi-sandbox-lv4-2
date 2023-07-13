import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AppShell from "@/components/layout/appshell";
import SuggestionPost from "@/components/post/suggestion/post";
import {
  Box,
  Title,
  Text,
  Group,
  MantineTheme,
  createStyles,
  rem,
} from "@mantine/core";
import {
  fetchPostDetail,
  fetchSuggestions,
  fetcher,
  getQueryClient,
} from "@/utils/queries";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { PostsQueryResult, PrefetchQueryResult } from "@/types";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { GetStaticProps } from "next";

const useStyle = createStyles((theme: MantineTheme) => ({
  heading: {
    color: theme.colors.gray[7],
    lineHeight: rem(58),
    fontWeight: 700,
    fontSize: rem(36),
  },
  summary: {
    color: "black",
    fontWeight: 600,
    fontSize: rem(18),
    lineHeight: rem(32),
  },
  byLine: {
    color: theme.colors.gray[6],
    textTransform: "uppercase",
    fontWeight: 400,
    lineHeight: rem(58),
  },
  author: {
    color: "black",
  },
  category: {
    color: "black",
  },
  image: {
    width: "100%",
    height: rem(679),
    position: "relative",
    marginTop: rem(133),
    overflow: "hidden",
    borderRadius: "10px",
  },
  content: {
    color: theme.colors.gray[6],
    marginTop: rem(51),
    lineHeight: rem(40),
    fontSize: rem(20),
  },
  link: {
    textDecoration: "none",
    color: theme.colors.gray[6],
  },
  articleLink: {
    textDecoration: "none",
    color: "black",
    [`&:visited`]: {
      color: "black",
      textDecoration: "none",
    },
  },
}));

export default function DetailPage() {
  const { classes } = useStyle();
  const router = useRouter();
  const { slug } = router.query;
  const { data: post } = useQuery(["post", slug as string], fetchPostDetail);
  const { data: suggestions, isLoading: isLoadingSuggestion } = useQuery(
    ["suggestion", { excludedArticleId: post?.data.id, perPage: 2 }],
    fetchSuggestions
  );
  return (
    <>
      <Head>
        <title>Bahram</title>
        <meta name="description" content="Short Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell>
        <Box
          sx={{
            [`& > * + *`]: {
              marginBottom: rem(29),
            },
          }}>
          <Title order={2} className={classes.heading}>
            {post?.data.title}
          </Title>
          <Text component="p" className={classes.summary}>
            {post?.data.summary}
          </Text>
          <Text component="p" className={classes.byLine}>
            by{" "}
            <span className={classes.author}>
              {[
                post?.data.author.firstName,
                post?.data.author.middleName,
                post?.data.author.lastName,
              ].join(" ")}
            </span>{" "}
            in{" "}
            <span className={classes.category}>{post?.data.category.name}</span>
          </Text>
          <Box component="div" className={classes.image}>
            <Image
              src={post?.data.thumbnail as string | StaticImport}
              alt=""
              fill></Image>
          </Box>
          <Text component="p" className={classes.content}>
            {post?.data.content}
          </Text>
        </Box>
        <Box sx={{ marginTop: rem(89) }}>
          <Group position="apart" align="center">
            <Title
              sx={{
                fontSize: rem(36),
                fontWeight: 600,
                lineHeight: rem(46),
              }}
              order={4}>
              You might also like ...
            </Title>
            <Link className={classes.link} href={`${slug}/relates`}>
              More...
            </Link>
          </Group>
          <Group
            position="apart"
            align="center"
            sx={{
              marginTop: rem(62),
            }}>
            {suggestions?.data.map((suggestion) => (
              <Link
                className={classes.articleLink}
                key={suggestion.slug}
                href={`/${suggestion.slug}`}>
                <SuggestionPost
                  author={[
                    post?.data.author.firstName,
                    post?.data.author.middleName,
                    post?.data.author.lastName,
                  ].join(" ")}
                  title={suggestion.title}
                  summary={suggestion.summary}
                  category={suggestion.category.name}
                  thumbnail={suggestion.thumbnail}
                />
              </Link>
            ))}
          </Group>
        </Box>
      </AppShell>
    </>
  );
}

export const getStaticPaths = async () => {
  try {
    const { data } = await fetcher<PostsQueryResult>({ perPage: 12 });
    const paths = data.map(({ slug }) => ({ params: { slug } }));
    return {
      paths,
      fallback: false,
    };
  } catch (err) {
    throw err;
  }
};

export const getStaticProps: GetStaticProps<PrefetchQueryResult> = async ({
  params,
}) => {
  const queryClient = getQueryClient();
  try {
    await queryClient.fetchQuery(
      ["post", params?.slug as string],
      fetchPostDetail
    );
  } catch (err) {
    throw err;
  }
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
