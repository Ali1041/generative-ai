import { HOC } from "@/components/HOC";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <HOC>
        <Component {...pageProps} />
      </HOC>
    </SessionProvider>
  );
}
