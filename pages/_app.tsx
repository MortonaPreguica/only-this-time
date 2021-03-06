import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/index';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}


export default MyApp
