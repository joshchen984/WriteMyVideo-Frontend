import React, { useRef } from 'react';
import InputContainer from './InputContainer';
import { Typography, Box, Button, FormHelperText } from '@mui/material';

const color = '#336AFF';

type ScriptInputProps = {
  setTranscript: (transcript: File | null) => void;
  transcriptErrorMessage: string;
  transcriptError: boolean;
  setTranscriptError: (isError: boolean) => void;
  setTranscriptErrorMessage: (msg: string) => void;
};
const ScriptInput = ({
  setTranscript,
  transcriptErrorMessage,
  transcriptError,
  setTranscriptError,
  setTranscriptErrorMessage,
}: ScriptInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTranscript((event.target as HTMLInputElement).files![0]);
    setTranscriptError(false);
    setTranscriptErrorMessage('');
  };
  const scriptRef = useRef<null | HTMLInputElement>(null);
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
      <FormHelperText error={transcriptError}>
        {transcriptErrorMessage}
      </FormHelperText>
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
        <input type="file" hidden onChange={handleChange} ref={scriptRef} />
      </Button>
      <Typography>
        {scriptRef?.current?.files?.length
          ? scriptRef.current.files.length > 0
            ? scriptRef.current.files[0].name
            : null
          : null}
      </Typography>
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
