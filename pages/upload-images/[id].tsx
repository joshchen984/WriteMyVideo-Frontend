import React, { useEffect, useMemo, createRef, useState } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import { Box, Typography, Button, FormHelperText } from '@mui/material';
import { useRouter } from 'next/router';
import Spinner from '../../components/Spinner';
import UploadImagesForm, {
  Word,
} from '../../components/Inputs/UploadImagesForm';
import axios from 'axios';
import { getFileExtension } from '../../app/utils';
import { gaEvent } from '../../app/gtag';

const UploadImages = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { id, words: wordsQuery, use_audio, num_images } = router.query;
  const num_imgs: number = num_images ? parseFloat(num_images as string) : 0;
  const words: Word[] = wordsQuery
    ? JSON.parse(wordsQuery as string).map((word: [string, boolean]) => ({
        text: word[0],
        isImage: word[1],
      }))
    : [];

  useEffect(() => {
    if (!loading && (!wordsQuery || !use_audio || !num_images || !id)) {
      router.push('/404');
    }
    setLoading(false);
  }, [wordsQuery, use_audio, router, num_images, id]);
  const inputRefs = useMemo(
    () =>
      Array(num_imgs)
        .fill(0)
        .map((i) => createRef<HTMLInputElement>()),
    [num_imgs]
  );

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (id) {
      formData.append('tmp_name', id as string);
    }
    for (let i = 0; i < num_imgs; i++) {
      if (
        inputRefs[i].current &&
        inputRefs[i].current!.files &&
        inputRefs[i].current!.files!.length > 0
      ) {
        const ext = getFileExtension(inputRefs[i].current!.files![0].name);
        if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
          formData.append(i.toString(), inputRefs[i].current!.files![0]);
        } else {
          setError(true);
          setErrorMessage('Image files must be .jpg or .png');
          return;
        }
      } else {
        setError(true);
        setErrorMessage(
          "You didn't upload an image for each image description"
        );
        return;
      }
    }
    formData.append('use_audio', use_audio as string);
    setSubmitting(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/create-video`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      gaEvent('create_video_custom_images', {});
      router.push(`/show-video/${data}`);
    } catch (e) {
      console.log(e);
      setSubmitting(false);
    }
  };

  let formHtml = (
    <>
      <Spinner />
      <Typography>
        We&apos;re creating your video now. It could take a few minutes. In the
        meantime, please watch this thing spin around.
      </Typography>
    </>
  );
  if (words && !submitting) {
    formHtml = (
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <UploadImagesForm inputRefs={inputRefs} transcript={words} />
        <FormHelperText error={error}>{errorMessage}</FormHelperText>
        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: '40px',
            fontSize: '1.25rem',
          }}
        >
          Create My Video
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Upload Images | WriteMyVideo</title>
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
            <Typography variant="h1" gutterBottom>
              Upload{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Your Images
              </Box>
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>
              Your script is shown below
            </Typography>
            <Typography>
              Click on the{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                blue image descriptions
              </Box>{' '}
              to upload your image files (JPG/PNG/GIF).
            </Typography>
            {formHtml}
          </Box>
        </Layout>
      </main>
    </>
  );
};

export default UploadImages;
