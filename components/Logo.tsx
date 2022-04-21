import React from 'react';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { css, jsx } from '@emotion/react';

const Logo = () => {
  const theme = useTheme();
  return (
    <Link href="/">
      <a
        css={css`
          font-size: 2.5rem;
          font-weight: 600;
          display: inline;
        `}
      >
        <span
          css={css`
            color: ${theme.palette.primary.main};
          `}
        >
          WriteMy
        </span>
        <span
          css={css`
            color: black;
          `}
        >
          Video
        </span>
      </a>
    </Link>
  );
};

export default Logo;
