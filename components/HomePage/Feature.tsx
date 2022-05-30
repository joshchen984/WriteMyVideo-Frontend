import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

type FeatureProps = {
  image: any;
  header: string;
  body: string;
  alt: string;
};
const Feature = ({ image, header, body, alt }: FeatureProps) => {
  return (
    <Box sx={{ width: '25%' }}>
      <Image src={image} alt={alt} />
      <Typography
        sx={{
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: '1.5rem',
        }}
      >
        {header}
      </Typography>
      <Typography>{body}</Typography>
    </Box>
  );
};

export default Feature;
