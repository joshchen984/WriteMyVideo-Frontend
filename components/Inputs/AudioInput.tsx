import React, { useRef } from 'react';
import InputContainer from './InputContainer';
import {
  Typography,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
  FormHelperText,
} from '@mui/material';
import { AudioOption } from '../../pages/create-video';

const color = '#28A164';

type AudioInputProps = {
  audioOption: AudioOption;
  setAudioOption: (option: AudioOption) => void;
  setAudio: (audio: File | null) => void;
  audioErrorMessage: string;
  audioError: boolean;
  setAudioError: (isError: boolean) => void;
  setAudioErrorMessage: (msg: string) => void;
};
const AudioInput = ({
  audioOption,
  setAudioOption,
  setAudio,
  audioErrorMessage,
  audioError,
  setAudioError,
  setAudioErrorMessage,
}: AudioInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAudioOption((event.target as HTMLInputElement).value as AudioOption);
    setAudioError(false);
    setAudioErrorMessage('');
  };
  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAudio((event.target as HTMLInputElement).files![0]);
    setAudioError(false);
    setAudioErrorMessage('');
  };

  const audioRef = useRef<null | HTMLInputElement>(null);
  let audioButton = null;
  if (audioOption === AudioOption.Custom) {
    audioButton = (
      <>
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
          <input
            type="file"
            hidden
            onChange={handleAudioChange}
            ref={audioRef}
          />
        </Button>
        <Typography>
          {audioRef?.current?.files?.length
            ? audioRef.current.files.length > 0
              ? audioRef.current.files[0].name
              : null
            : null}
        </Typography>
      </>
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
      <FormControl error={audioError} sx={{ display: 'block' }}>
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
            label="I will upload my recorded voiceover (.mp3)"
          />
        </RadioGroup>
        <FormHelperText>{audioErrorMessage}</FormHelperText>
      </FormControl>
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
