import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import { Box, Typography } from '@mui/material';
import ExampleScript from '../public/example-script.png';

const Tutorial: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tutorial | WriteMyVideo</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isTutorial />
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
            <Box sx={{ marginBottom: '3rem' }}>
              <Typography variant="h1">
                How to Make a Slideshow Video with
                <br />
                <Box component="span" sx={{ color: 'primary.main' }}>
                  WriteMyVideo
                </Box>
              </Typography>
            </Box>
            <Box sx={{ width: '100%', marginBottom: '1.5rem' }}>
              <Typography variant="h2" gutterBottom>
                1. Save script as Text File (.txt)
              </Typography>
              <Typography variant="body1">
                In a text editor (Google Docs, Microsoft Word), write out the
                script you&apos;d like to use for your video narration. Insert
                image descriptions, in brackets, into the script where you would
                like them to appear. Be as specific as possible and double-check
                your spelling, as the Video Creator selects a top search result
                from Google Images. Save the script as a text file (.txt).
                <br />
                <br />
                In this example, the video will start with a picture of Romeo
                and Juliet art, then an image of William Shakespeare will appear
                after the narration says the phrase &quot;written by???
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Image src={ExampleScript} alt="picture of an example script" />
              </Box>
              <Typography variant="body1">
                Make sure there is an image description at the very start of the
                script, or else the program won&apos;t know what image to start
                the video with.
              </Typography>
            </Box>
            <Box sx={{ width: '100%', marginBottom: '1.5rem' }}>
              <Typography variant="h2" gutterBottom>
                2. Upload Your Script
              </Typography>
              <Typography variant="body1">
                Click the Upload Script button to upload the text file from your
                computer to the Video Creator Tool.
              </Typography>
            </Box>
            <Box sx={{ width: '100%', marginBottom: '1.5rem' }}>
              <Typography variant="h2" gutterBottom>
                3. Record Your Voice-over or Use a Computer-Generated Voice
              </Typography>
              <Typography variant="body1">
                A computer-generated voice-over of your script will
                automatically be used. However, if you prefer to use your own
                voice-over, create a recording of yourself reading the script.
                You should read the text exactly as written, without the image
                descriptions-we suggest copying and pasting the script and
                deleting the image descriptions so you have a clean copy to read
                from. Save your voice-over as an audio file (.mp3).
                <br />
                <br />
                To easily record your own voiceover, use an online voice
                recorder such as{' '}
                <a
                  href="https://online-voice-recorder.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  online-voice-recorder.com
                </a>{' '}
                (to start recording, click the small red circle on the homepage;
                to re-record, refresh the page).
              </Typography>
            </Box>
          </Box>
        </Layout>
      </main>
    </>
  );
};

export default Tutorial;
