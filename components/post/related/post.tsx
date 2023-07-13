import Image from "next/image";
import type { Post } from "@/types";
import {
  Group,
  Box,
  Title,
  Text,
  createStyles,
  rem,
  MantineTheme,
} from "@mantine/core";

interface RelatedPostProps
  extends Pick<Post, "title" | "thumbnail" | "summary"> {
  index?: number;
  author: string;
  category: string;
}

const useStyle = createStyles((theme: MantineTheme) => ({
  card: {
    height: rem(360),
    borderRadius: rem(8),
    boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.08)",
    marginBottom: rem(40),
    overflow: "hidden",
  },
  cardContent: {
    width: "50%",
    padding: `${rem(21)} ${rem(61)} ${rem(21)} ${rem(50)}`,
  },
  cardImage: {
    width: "50%",
    height: rem(360),
    position: "relative",
    overflow: "hidden",
  },
  cardHeading: {
    fontSize: rem(28),
    lineHeight: rem(46),
    fontWeight: 600,
  },
  cardText: {
    lineHeight: rem(32),
    color: theme.colors.gray[5],
  },
  cardIndex: {
    fontSize: rem(24),
    lineHeight: rem(58),
  },
}));

export default function Post({
  index,
  author,
  title,
  thumbnail,
  summary,
  category,
}: RelatedPostProps) {
  const { classes } = useStyle();
  return (
    <Group className={classes.card} spacing={0}>
      <Box className={classes.cardContent}>
        <Text component="span" className={classes.cardIndex}>
          {String(index).padStart(2, "0")}
        </Text>
        <Title className={classes.cardHeading} order={3}>
          {title}
        </Title>
        <Text className={classes.cardText} component="p">
          {summary}
        </Text>
      </Box>
      <Box className={classes.cardImage}>
        <Image src={thumbnail} alt="" fill />
      </Box>
    </Group>
  );
}
