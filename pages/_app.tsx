import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "light",
            components: {
              Container: {
                defaultProps: {
                  sizes: {
                    md: 1140,
                  },
                },
              },
            },
            colors: {
              warmPink: [
                "#F2B2C3",
                "#FF5480",
                "#DA2755",
                "#93314A",
                "#65303D",
                "#472A32",
                "#332327",
                "#251C1F",
              ],
            },
          }}>
          <Component {...pageProps} />
        </MantineProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
