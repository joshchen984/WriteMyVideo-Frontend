import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type InputContainerProps = {
  Left: ReactNode;
  Tips: ReactNode;
  color: string;
};
const InputContainer = ({ Left, Tips, color }: InputContainerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: 10,
        border: '1px solid #A5A5A5',
        margin: '1rem 0',
        padding: '1.75rem',
      }}
    >
      <Box sx={{ flex: '1 1 50%' }}>{Left}</Box>
      <Box sx={{ flex: '1 1 50%' }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', fontSize: '1.6575rem', color: 'black' }}
        >
          Tips:
        </Typography>
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            'li::before': {
              content: "'\\2022'",
              color: color,
              fontWeight: 'bold',
              display: 'inline-block',
              width: '1em',
              marginLeft: '-1em',
            },
            li: {
              fontWeight: 300,
            },
          }}
        >
          {Tips}
        </Box>
      </Box>
    </Box>
  );
};

export default InputContainer;
