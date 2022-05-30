import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Feature from './Feature';
import photoAlbumSvg from '../../public/photo-album.svg';
import messageSvg from '../../public/message.svg';
import clickSvg from '../../public/click.svg';
import Link from 'next/link';

const Features = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1" component="h2" gutterBottom>
        Make{' '}
        <Box component="span" sx={{ color: 'primary.main' }}>
          professional
        </Box>
      </Typography>
      <Typography variant="subtitle1" sx={{ maxWidth: '800px' }}>
        looking presentation videos, for school, work, social media, family
        memories, or just for fun!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '4rem 0',
        }}
      >
        <Feature
          image={photoAlbumSvg}
          header="Images"
          body="We’ll find images for you using Google Image Search OR you can upload your own"
          alt="picture of photo album"
        />
        <Feature
          image={messageSvg}
          header="Narration"
          body="A computer-generated voiceover can be used OR record your own"
          alt="picture of chat message"
        />
        <Feature
          image={clickSvg}
          header="Just a Few Clicks"
          body="It only takes a few minutes to create your slideshow video"
          alt="picture of mouse clicking"
        />
      </Box>
      <Link href="/create-video" passHref>
        <Button
          variant="contained"
          sx={{
            borderRadius: '40px',
            fontSize: '1.25rem',
            textTransform: 'none',
            marginRight: '2rem',
          }}
        >
          Get Started
        </Button>
      </Link>
    </Box>
  );
};

export default Features;
