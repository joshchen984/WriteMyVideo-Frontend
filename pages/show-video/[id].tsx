import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import Spinner from '../../components/Spinner';
import DownloadIcon from '@mui/icons-material/Download';
import { gaEvent } from '../../app/gtag';
import fileDownload from 'js-file-download';
import axios from 'axios';

const checkVideoExists = async (id: string | undefined) => {
  if (id === undefined) {
    return false;
  }
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/exists/${id}`
  );
  return result.data === 'True';
};

const checkVideoPlayable = async (url: string) => {
  const result = await fetch(url, { method: 'HEAD' });
  return result.ok;
};

const ShowVideo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [videoExists, setVideoExists] = useState<boolean>(false);
  const [videoPlayable, setVideoPlayable] = useState<boolean>(false);
  const [currentTimeout, setCurrentTimeout] = useState<number | undefined>(
    undefined
  );
  const videoLink = `${process.env.NEXT_PUBLIC_API_URL}/static/videos/${id}.mp4`;

  const checkVideoExistsOnInterval = async (seconds: number) => {
    const exists: boolean = await checkVideoExists(id as string | undefined);
    const playable: boolean = await checkVideoPlayable(videoLink);
    if (!exists) {
      setVideoExists(exists);
      setCurrentTimeout(
        window.setTimeout(async function () {
          await checkVideoExistsOnInterval(seconds);
        }, seconds * 1000)
      );
    } else {
      /* set a timeout before being able to download video because video hasn't
      fully been converted yet
      */
      setTimeout(function () {
        setVideoExists(exists);
      }, 1000);
      if (playable) {
        /* set a timeout before rendering video because video hasn't
      fully been converted yet when head request succeeds 
      */
        setTimeout(function () {
          setVideoPlayable(playable);
        }, 1000);
      } else {
        setVideoPlayable(playable);
        setCurrentTimeout(
          window.setTimeout(async function () {
            await checkVideoExistsOnInterval(seconds);
          }, seconds * 1000)
        );
      }
    }
  };

  useEffect(() => {
    const startCheckingForVideo = async () => {
      if (id !== undefined) {
        await checkVideoExistsOnInterval(10);
      }
    };
    startCheckingForVideo();

    return () => {
      clearTimeout(currentTimeout);
    };
  }, [id]);

  const download = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/download/${id}`,
      { responseType: 'blob' }
    );
    gaEvent('download_video', {});
    fileDownload(res.data, 'video.mp4');
  };
  let videoHtml = (
    <>
      <Spinner />
      <Typography>
        When the "Download Your Video" button appears, click on it to save your
        video file. If you wait a few more minutes, you will also be able to
        play your video on the website.
      </Typography>
    </>
  );
  if (videoPlayable) {
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
  let buttonHtml = null;
  if (videoExists) {
    buttonHtml = (
      <Button
        onClick={download}
        variant="contained"
        sx={{
          borderRadius: '40px',
          fontSize: '1.25rem',
        }}
        endIcon={<DownloadIcon />}
      >
        Download Your Video
      </Button>
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
            {buttonHtml}
          </Box>
        </Layout>
      </main>
    </>
  );
};

export default ShowVideo;
