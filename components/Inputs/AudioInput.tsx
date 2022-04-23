import React from 'react';
import InputContainer from './InputContainer';
import {
  Typography,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { AudioOption } from '../../pages/create-video';

const color = '#28A164';

type AudioInputProps = {
  audioOption: AudioOption;
  setAudioOption: (option: AudioOption) => void;
};
const AudioInput = ({ audioOption, setAudioOption }: AudioInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAudioOption((event.target as HTMLInputElement).value as AudioOption);
  };
  let audioButton = null;
  if (audioOption === AudioOption.Custom) {
    audioButton = (
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
        Upload File
        <input type="file" hidden />
      </Button>
    );
  }
  const Left = (
    <>
      <Typography sx={{ fontWeight: 'bold', fontSize: '2rem', color }}>
        Step 02
      </Typography>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '1.75rem',
          marginTop: '1rem',
          marginBottom: '1.2rem',
        }}
      >
        Choose a voice over:
      </Typography>
      <RadioGroup value={audioOption} onChange={handleChange}>
        <FormControlLabel
          value={AudioOption.Computer}
          control={
            <Radio
              sx={{
                color,
              }}
            />
          }
          label="Use a computer-generated narration"
        />
        <FormControlLabel
          value={AudioOption.Custom}
          control={
            <Radio
              sx={{
                color,
              }}
            />
          }
          label="I will upload my recorded voiceover (.wav or .mp3 file)"
        />
      </RadioGroup>
      {audioButton}
    </>
  );
  const Tips = (
    <>
      <li>
        To record your own voiceover, use a program such as{' '}
        <a
          href="https://online-voice-recorder.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          online-voice-recorder.com
        </a>
        .
      </li>
      <li>Read the text exactly as written, minus the image descriptions.</li>
    </>
  );
  return <InputContainer Left={Left} Tips={Tips} color={color} />;
};

export default AudioInput;
