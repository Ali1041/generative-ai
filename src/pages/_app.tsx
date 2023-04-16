import { HOC } from '@/components/HOC'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <HOC><Component {...pageProps} /></HOC>
}
