import React from 'react';
import { Box } from '@mui/material';

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
  const transcriptHtml = transcript.map((word) => {
    if (word.isImage) {
      imageIdx++;
      return (
        <React.Fragment key={`word-${imageIdx}`}>
          <input
            type="file"
            id={`word-${imageIdx}`}
            name={imageIdx.toString()}
            hidden
            ref={inputRefs[imageIdx]}
          />
          <label
            htmlFor={`word-${imageIdx}`}
            css={{
              color: 'blue',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            id={`word-label-${imageIdx}`}
          >
            {word.text}
          </label>
          <script>
            {/* listenForUpload('word-{{word[2]}}', 'word-label-{{word[2]}}'); */}
          </script>{' '}
        </React.Fragment>
      );
    } else {
      return word.text + ' ';
    }
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
