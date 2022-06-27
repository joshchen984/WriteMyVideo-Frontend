import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import Spinner from '../../components/Spinner';
import DownloadIcon from '@mui/icons-material/Download';

const fileExists = async (url: string) => {
  const result = await fetch(url, { method: 'HEAD' });
  return result.ok;
};

const ShowVideo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [videoExists, setVideoExists] = useState<boolean>(false);
  const [currentTimeout, setCurrentTimeout] = useState<number | undefined>(
    undefined
  );
  const videoLink = `${process.env.NEXT_PUBLIC_API_URL}/static/videos/${id}.mp4`;

  const checkVideoExistsOnInterval = async (url: string, seconds: number) => {
    const exists: boolean = await fileExists(url);
    setVideoExists(exists);
    if (!videoExists) {
      setCurrentTimeout(
        window.setTimeout(async function () {
          await checkVideoExistsOnInterval(url, seconds);
        }, seconds * 1000)
      );
    }
  };

  useEffect(() => {
    const startCheckingForVideo = async () => {
      if (id !== undefined) {
        await checkVideoExistsOnInterval(videoLink, 10);
      }
    };
    startCheckingForVideo();

    return () => {
      clearTimeout(currentTimeout);
    };
  }, [videoLink]);
  let videoHtml = (
    <>
      <Spinner />
      <Typography>
        We&apos;re creating your video now. It could take a few minutes. In the
        meantime, please watch this thing spin around.
      </Typography>
    </>
  );
  if (videoExists) {
    videoHtml = (
      <video
        width="960"
        height="540"
        controls
        css={{
          marginBottom: '1rem',
        }}
      >
        <source src={videoLink} type="video/mp4" />
        Your browser does not support the video tag
      </video>
    );
  }

  return (
    <>
      <Head>
        <title>Download Video | WriteMyVideo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Layout>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Typography variant="h1">
              Download{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Your Video
              </Box>
            </Typography>
            {videoHtml}
            <Button
              download="video.mp4"
              href={videoLink}
              variant="contained"
              sx={{
                borderRadius: '40px',
                fontSize: '1.25rem',
              }}
              endIcon={<DownloadIcon />}
            >
              Download Your Video
            </Button>
          </Box>
        </Layout>
      </main>
    </>
  );
};

export default ShowVideo;
