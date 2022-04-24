import React from 'react';
import InputContainer from './InputContainer';
import { Typography, Box, Button } from '@mui/material';

const color = '#336AFF';

type ScriptInputProps = {
  setTranscript: (transcript: File | null) => void;
};
const ScriptInput = ({ setTranscript }: ScriptInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTranscript((event.target as HTMLInputElement).files![0]);
  };
  const Left = (
    <>
      <Typography sx={{ fontWeight: 'bold', fontSize: '2rem', color }}>
        Step 01
      </Typography>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '1.75rem',
          marginTop: '1rem',
          marginBottom: '1.2rem',
        }}
      >
        Upload your script as a{' '}
        <Box component="span" sx={{ color }}>
          .txt
        </Box>{' '}
        file
      </Typography>
      <Button
        variant="contained"
        component="label"
        color="info"
        sx={{
          textTransform: 'none',
          borderRadius: '40px',
          fontSize: '1.25rem',
        }}
      >
        Upload Script
        <input type="file" hidden onChange={handleChange} />
      </Button>
    </>
  );
  const Tips = (
    <>
      <li>
        Insert image descriptions, in brackets, at the very beginning and
        wherever you want a new image to appear.
      </li>
      <li>
        If you choose to let Google Search find your images, these descriptions
        will be used as search terms so make them as specific as possible.
      </li>
      <li>
        Script Example: [romeo and juliet art] Romeo and Juliet is a play
        written by [william shakespeare] William Shakespeare.
      </li>
    </>
  );
  return <InputContainer Left={Left} Tips={Tips} color={color} />;
};

export default ScriptInput;
