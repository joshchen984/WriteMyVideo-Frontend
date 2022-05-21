import React, { useMemo } from 'react';
import InputContainer from './InputContainer';
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  MenuItem,
} from '@mui/material';
import { ImageRights, ImagesOption } from '../../pages/create-video';

const color = '#FF3654';

type UseImagesInputProps = {
  imagesOption: ImagesOption;
  setImagesOption: (option: ImagesOption) => void;
  imageRights: ImageRights;
  setImageRights: (option: ImageRights) => void;
};
const UseImagesInput = ({
  imagesOption,
  setImagesOption,
  imageRights,
  setImageRights,
}: UseImagesInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImagesOption((event.target as HTMLInputElement).value as ImagesOption);
  };
  const handleRightsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageRights((event.target as HTMLInputElement).value as ImageRights);
  };

  let imageRightsButton = null;
  if (imagesOption === ImagesOption.Google) {
    imageRightsButton = (
      <TextField
        select
        label="Usage Rights"
        helperText="Pick Usage Rights for Images"
        value={imageRights || ImageRights.Any}
        onChange={handleRightsChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: color,
            },
          },
          '& label.Mui-focused': {
            color,
          },
        }}
      >
        {Object.values(ImageRights).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    );
  }
  const Left = (
    <>
      <Typography sx={{ fontWeight: 'bold', fontSize: '2rem', color }}>
        Step 03
      </Typography>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '1.75rem',
          marginTop: '1rem',
          marginBottom: '1.2rem',
        }}
      >
        Find images for your slideshow:
      </Typography>
      <RadioGroup value={imagesOption} onChange={handleChange}>
        <FormControlLabel
          value={ImagesOption.Google}
          control={
            <Radio
              sx={{
                color,
                '&.Mui-checked': {
                  color,
                },
              }}
            />
          }
          label="Let Google find images for my slideshow"
        />
        {imageRightsButton}
        <FormControlLabel
          value={ImagesOption.Custom}
          control={
            <Radio
              sx={{
                color,
                '&.Mui-checked': {
                  color,
                },
              }}
            />
          }
          label=" I will upload my own images (.jpg or .png file)"
        />
      </RadioGroup>
    </>
  );
  const Tips = (
    <>
      <li>Lorem Ipsum is simply dummy text of the printing</li>
      <li>Typesetting industry. Lorem Ipsum has been the industrys</li>
    </>
  );
  return <InputContainer Left={Left} Tips={Tips} color={color} />;
};

export default UseImagesInput;
