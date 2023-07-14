import type { Post } from "@/types";
import { Box, Title, Text, createStyles, rem } from "@mantine/core";
import Image from "next/image";

interface PostProps extends Pick<Post, "title" | "thumbnail"> {
  author: string;
  category: string;
}

const useStyle = createStyles((theme) => ({
  cardImage: {
    width: rem(968),
    height: rem(606),
    position: "relative",
    borderRadius: rem(10),
    overflow: "hidden",
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
      height: rem(195.75),
    },
  },
  cardText: {
    paddingTop: rem(20),
    paddingBottom: rem(20),
    [`& > * + *`]: {
      marginTop: rem(12),
    },
  },
  article: {
    marginTop: rem(16),
    marginBottom: rem(106),
    padding: rem(16),
    [theme.fn.smallerThan("sm")]: {
      marginBottom: rem(32),
    },
  },
  headLine: {
    width: "85%",
    lineHeight: rem(61),
    fontSize: rem(48),
    fontWeight: 600,
    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
      lineHeight: rem(32),
      width: "100%",
    },
  },
  byLine: {
    color: theme.colors.gray[6],
    textTransform: "uppercase",
    fontWeight: 400,
    lineHeight: rem(58),
    [theme.fn.smallerThan("sm")]: {
      lineHeight: rem(24),
    },
  },
  author: {
    color: "black",
  },
  category: {
    color: "black",
  },
}));

export default function Post({
  title,
  author,
  thumbnail,
  category,
}: PostProps) {
  const { cx, classes } = useStyle();
  return (
    <Box component="article" className={cx(classes.article)}>
      <Box className={cx(classes.cardImage)}>
        <Image src={thumbnail} alt="" sizes="1077" fill />
      </Box>
      <Box className={cx(classes.cardText)}>
        <Text component="p" className={classes.byLine}>
          by <span className={classes.author}>{author}</span> in{" "}
          <span className={classes.category}>{category}</span>
        </Text>
        <Title order={2} className={classes.headLine}>
          {title}
        </Title>
      </Box>
    </Box>
  );
}
