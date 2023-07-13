import type { Post } from "@/types";
import {
  Box,
  MantineTheme,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import Image from "next/image";

interface SuggestionPostProps
  extends Pick<Post, "title" | "summary" | "thumbnail"> {
  author: string;
  category: string;
}

const useStyle = createStyles((theme: MantineTheme) => ({
  card: { width: rem(536), height: rem(700) },
  cardImage: {
    width: "100%",
    height: rem(358),
    position: "relative",
    borderRadius: rem(10),
    overflow: "hidden",
  },
  cardText: {
    paddingBottom: rem(20),
    [`& > * + *`]: {
      marginTop: rem(21),
    },
  },
  headLine: {
    // width: "85%",
    lineHeight: rem(46),
    fontSize: rem(28),
    fontWeight: 600,
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
}));

export default function Post({
  title,
  summary,
  thumbnail,
  author,
  category,
}: SuggestionPostProps) {
  const { classes } = useStyle();
  return (
    <Box component="article" className={classes.card}>
      <Box className={classes.cardImage}>
        <Image src={thumbnail} alt="" fill />
      </Box>
      <Box className={classes.cardText}>
        <Text component="p" className={classes.byLine}>
          by <span className={classes.author}>{author}</span> in{" "}
          <span className={classes.category}>{category}</span>
        </Text>
        <Title order={2} className={classes.headLine}>
          {title}
        </Title>
        <Text component="p">{summary}</Text>
      </Box>
    </Box>
  );
}
