import React from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';
import { css } from '@emotion/react';

const Logo = () => {
  return (
    <Link href="/" passHref>
      <a
        css={css`
          font-size: 2.5rem;
          font-weight: 600;
          display: inline;
          cursor: pointer;
          text-decoration: none;
        `}
      >
        <Box component="span" sx={{ color: 'primary.main' }}>
          WriteMy
        </Box>
        <Box component="span" sx={{ color: 'black' }}>
          Video
        </Box>
      </a>
    </Link>
  );
};

export default Logo;
