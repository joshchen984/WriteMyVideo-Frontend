import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import { Box, Typography, Button } from '@mui/material';
import ScriptInput from '../components/Inputs/ScriptInput';
import AudioInput from '../components/Inputs/AudioInput';
import UseImagesInput from '../components/Inputs/UseImagesInput';
import Spinner from '../components/Spinner';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getFileExtension } from '../utils';

export enum AudioOption {
  Computer = 'COMPUTER',
  Custom = 'CUSTOM',
}
export enum ImagesOption {
  Google = 'GOOGLE',
  Custom = 'CUSTOM',
}
export enum ImageRights {
  Any = 'any',
  LabeledForReuseWithModifications = 'labeled-for-reuse-with-modifications',
  LabeledForReuse = 'labeled-for-reuse',
  LabeledForNonCommercialReuseWithModification = 'labeled-for-noncommercial-reuse-with-modification',
  LabeledForNoCommercialReuse = 'labeled-for-nocommercial-reuse',
}

const CreateVideo: NextPage = () => {
  const router = useRouter();
  const [audioOption, setAudioOption] = useState<AudioOption>(
    AudioOption.Computer
  );
  const [imagesOption, setImagesOption] = useState<ImagesOption>(
    ImagesOption.Google
  );
  const [transcript, setTranscript] = useState<File | null>(null);
  const [transcriptError, setTranscriptError] = useState<boolean>(false);
  const [transcriptErrorMessage, setTranscriptErrorMessage] =
    useState<string>('');

  const [audio, setAudio] = useState<File | null>(null);
  const [audioError, setAudioError] = useState<boolean>(false);
  const [audioErrorMessage, setAudioErrorMessage] = useState<string>('');
  const [imageRights, setImageRights] = useState<ImageRights>(ImageRights.Any);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const submitHandler = async () => {
    const formData = new FormData();
    formData.append(
      'use_audio',
      (audioOption === AudioOption.Custom).toString()
    );
    formData.append(
      'use_images',
      (imagesOption === ImagesOption.Custom).toString()
    );
    formData.append('usage_rights', imageRights);
    if (transcript !== null) {
      const ext = getFileExtension(transcript.name);
      if (ext === 'txt') {
        formData.append('transcript', transcript);
      } else {
        setTranscriptError(true);
        setTranscriptErrorMessage('Script file must be .txt');
        return;
      }
    } else {
      setTranscriptError(true);
      setTranscriptErrorMessage("You didn't upload a script");
      return;
    }
    if (audioOption === AudioOption.Custom) {
      if (audio !== null) {
        const ext = getFileExtension(audio.name);
        if (ext === 'mp3') {
          formData.append('audio', audio);
        } else {
          setAudioError(true);
          setAudioErrorMessage('Audio file must be .mp3');
          return;
        }
      } else {
        setAudioError(true);
        setAudioErrorMessage("You didn't upload an audio file");
        return;
      }
    }
    setSubmitting(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload-images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: parseFloat(process.env.NEXT_PUBLIC_API_TIMEOUT as string),
        }
      );
      if (imagesOption === ImagesOption.Custom) {
        const urlParams = new URLSearchParams({
          use_audio: (audioOption === AudioOption.Custom).toString(),
          words: JSON.stringify(data.words),
          num_images: data.num_images,
        });
        router.push(`/upload-images/${data.tmp_name}?${urlParams.toString()}`);
      } else {
        router.push(`/show-video/${data}`);
      }
    } catch (e) {
      console.log(e);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create Video | WriteMyVideo</title>
        <meta name="description" content="" />
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
            {submitting ? (
              <>
                <Spinner />
                {imagesOption === ImagesOption.Google ? (
                  <Typography>
                    We&apos;re creating your video now. It could take a few
                    minutes. In the meantime, please watch this thing spin
                    around.
                  </Typography>
                ) : null}
              </>
            ) : (
              <>
                <Box>
                  <ScriptInput
                    setTranscript={setTranscript}
                    transcriptError={transcriptError}
                    setTranscriptError={setTranscriptError}
                    transcriptErrorMessage={transcriptErrorMessage}
                    setTranscriptErrorMessage={setTranscriptErrorMessage}
                  />
                  <AudioInput
                    audioOption={audioOption}
                    setAudioOption={setAudioOption}
                    setAudio={setAudio}
                    audioError={audioError}
                    audioErrorMessage={audioErrorMessage}
                    setAudioError={setAudioError}
                    setAudioErrorMessage={setAudioErrorMessage}
                  />
                  <UseImagesInput
                    imagesOption={imagesOption}
                    setImagesOption={setImagesOption}
                    imageRights={imageRights}
                    setImageRights={setImageRights}
                  />
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      borderRadius: '40px',
                      fontSize: '1.25rem',
                    }}
                    onClick={submitHandler}
                  >
                    Create My Video
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Layout>
      </main>
    </>
  );
};

export default CreateVideo;
