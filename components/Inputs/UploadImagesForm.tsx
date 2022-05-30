import React from 'react';
import { Box } from '@mui/material';
import WordInput from './WordInput';

export type Word = {
  text: string;
  isImage: boolean;
};
type UploadImagesFormProps = {
  transcript: Word[];
  inputRefs: React.RefObject<HTMLInputElement>[];
};
const UploadImagesForm = ({ transcript, inputRefs }: UploadImagesFormProps) => {
  let imageIdx = -1;
  const transcriptHtml = transcript.map((word, idx) => {
    if (word.isImage) {
      imageIdx++;
    }
    return (
      <WordInput
        key={`word-${idx}`}
        ref={word.isImage ? inputRefs[imageIdx] : undefined}
        text={word.text}
        isImage={word.isImage}
        imageIdx={imageIdx}
      />
    );
  });

  return (
    <Box
      sx={{
        backgroundColor: '#F7F8FC',
        margin: '1rem 0',
        padding: '1rem',
        width: '100%',
      }}
    >
      {transcriptHtml}
    </Box>
  );
};

export default UploadImagesForm;
