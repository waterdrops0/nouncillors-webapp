import '@/styles/globals.css';
import Head from 'next/head';
import Layout from '../components/Layout'

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Mint</title>
      </Head>
      
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
