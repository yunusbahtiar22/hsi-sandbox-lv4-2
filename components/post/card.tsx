import { Box, Title, Text, createStyles, rem } from "@mantine/core";
import Image from "next/image";

const useStyle = createStyles((theme) => ({
  cardImage: {
    width: rem(968),
    height: rem(606),
    position: "relative",
    borderRadius: rem(7),
    overflow: "hidden",
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
  },
  cardTitle: {
    lineHeight: rem(61),
    fontSize: rem(48),
    fontWeight: 600,
  },
}));

export default function Card() {
  const { cx, classes } = useStyle();
  return (
    <Box component="article" className={cx(classes.article)}>
      <Box className={cx(classes.cardImage)}>
        <Image
          src="https://hsi-sandbox.vercel.app/image/how-to-use-google-adwords-for-your-business-beginners-guide.png"
          alt=""
          sizes="1077"
          fill
        />
      </Box>
      <Box className={cx(classes.cardText)}>
        <Text>Thomes Laurinavicius</Text>
        <Title order={2} className={cx(classes.cardTitle)}>
          How to Use Google AdWord…ness (Beginner’s Guide)
        </Title>
      </Box>
    </Box>
  );
}
