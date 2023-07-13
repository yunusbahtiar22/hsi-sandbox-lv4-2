import {
  Box,
  Container,
  Group,
  rem,
  createStyles,
  type MantineTheme,
} from "@mantine/core";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { useRouter } from "next/router";

interface AppShellProps {
  children?: ReactNode | ReactNode[];
}

const useStyle = createStyles((theme: MantineTheme) => ({
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: rem(61),
    paddingBottom: rem(61),
    position: "relative",
  },
  container: {
    minHeight: "100vh",
    position: "relative",
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    textDecoration: "none",
    padding: `${rem(10)} ${rem(18)}`,
    borderRadius: rem(12),
    minWidth: rem(91),
    [`&:visited`]: {
      color: "black",
    },
  },
  active: {
    background: theme.colors.warmPink[7],
    color: "white",
    [`&:visited`]: {
      color: "white",
    },
  },
}));

export default function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const { sort = "new" } = router.query;
  const { cx, classes } = useStyle();
  return (
    <Container className={cx(classes.container)}>
      <Box component="header" className={cx(classes.header)}>
        <Link href="/">
          <Image src={Logo} width="99" height="29" alt=""></Image>
        </Link>
        {router.pathname === "/" && (
          <Group
            spacing={30}
            sx={() => ({
              position: "absolute",
              left: -100,
            })}>
            <Link
              className={cx(classes.link, {
                [classes.active]: sort === "popular",
              })}
              href="/?sort=popular">
              Popular
            </Link>
            <Link
              href="/?sort=new"
              className={cx(classes.link, {
                [classes.active]: sort === "new",
              })}>
              New
            </Link>
          </Group>
        )}
      </Box>
      <Box component="main">{children}</Box>
    </Container>
  );
}
