import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import { Box, Typography, Button, Grid } from '@mui/material';
import FirstPage from '../components/HomePage/FirstPage';
import Features from '../components/HomePage/Features';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Landing Page | WriteMyVideo</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Layout>
          <FirstPage />
          <Features />
        </Layout>
      </main>
    </div>
  );
};

export default Home;
