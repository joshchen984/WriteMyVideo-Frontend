import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import videoConversionImage from '../../public/video-conversion.jpg';

const FirstPage = () => {
  return (
    <Box sx={{ height: 'calc(90vh - 138px)' }}>
      <Grid
        container
        sx={{ height: '100%', paddingBottom: '50vh', paddingTop: '10vh' }}
        alignItems="center"
      >
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
          xs={6}
        >
          <Typography variant="h1" sx={{ textAlign: 'left' }} gutterBottom>
            Create Slideshow Videos
            <br />
            <Box component="span" sx={{ color: 'primary.main' }}>
              quickly and easily!
            </Box>
          </Typography>
          <Typography
            marginBottom={4}
            variant="subtitle1"
            sx={{
              textAlign: 'left',
              textTransform: 'none',
            }}
          >
            No experience needed.
            <br />
            Just write a script and we’ll do the rest!
          </Typography>
          <Box>
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
            <Button
              variant="outlined"
              sx={{
                borderRadius: '40px',
                fontSize: '1.25rem',
                textTransform: 'none',
              }}
            >
              Learn More
            </Button>
          </Box>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center" xs={6}>
          <Grid item sx={{ marginRight: '7rem' }}>
            <Image
              src={videoConversionImage}
              alt="picture of text being transformed into a video"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FirstPage;
