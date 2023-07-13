import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "'Open Sans', sans-serif",
            headings: {
              fontFamily: "'Open Sans', sans-serif",
            },
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
                "#EADCE0",
                "#E5CCD2",
                "#E2BAC4",
                "#E2A6B6",
                "#E68FA6",
                "#F07494",
                "#FF5480",
                "#EC567D",
                "#DA5879",
                "#C95976",
              ],
            },
            primaryColor: "warmPink",
          }}>
          <Component {...pageProps} />
        </MantineProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
