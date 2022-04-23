import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import { Box, Typography, Button } from '@mui/material';
import ScriptInput from '../components/Inputs/ScriptInput';
import AudioInput from '../components/Inputs/AudioInput';
import UseImagesInput from '../components/Inputs/UseImagesInput';

export enum AudioOption {
  Computer = 'COMPUTER',
  Custom = 'CUSTOM',
}
export enum ImagesOption {
  Google = 'GOOGLE',
  Custom = 'CUSTOM',
}
const CreateVideo: NextPage = () => {
  const [audioOption, setAudioOption] = useState<AudioOption>(
    AudioOption.Computer
  );
  const [imagesOption, setImagesOption] = useState<ImagesOption>(
    ImagesOption.Google
  );
  return (
    <>
      <Head>
        <title>Create Video</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isCreateVideo />
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
            <Box>
              <Typography variant="h1">
                Create Your Slideshow Video
                <br />{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  In 3 Easy Steps
                </Box>
              </Typography>
              <Typography variant="subtitle1">
                First time using WriteMyVideo? Check out our tutorial!
              </Typography>
            </Box>
            <Box>
              <ScriptInput />
              <AudioInput
                audioOption={audioOption}
                setAudioOption={setAudioOption}
              />
              <UseImagesInput
                imagesOption={imagesOption}
                setImagesOption={setImagesOption}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: '40px',
                }}
              >
                Create My Video
              </Button>
            </Box>
          </Box>
        </Layout>
      </main>
    </>
  );
};

export default CreateVideo;
