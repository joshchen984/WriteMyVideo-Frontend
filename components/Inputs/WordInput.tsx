import React, { forwardRef } from 'react';
import { useForwardedRef } from '../../app/hooks';

type WordInputProps = {
  text: string;
  isImage: boolean;
  imageIdx: number;
};
const WordInput = forwardRef(
  (
    { isImage, text, imageIdx }: WordInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const usableRef = useForwardedRef(ref);
    const changeHandler = (labelId: string) => {
      const label = document.getElementById(labelId);
      label!.textContent = `[${usableRef.current!['files'][0]['name']}]`;
    };

    if (isImage) {
      return (
        <>
          <input
            type="file"
            id={`word-${imageIdx}`}
            name={imageIdx.toString()}
            hidden
            ref={usableRef}
            onChange={() => changeHandler(`word-label-${imageIdx}`)}
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
            {text}
          </label>{' '}
        </>
      );
    } else {
      return <>{text + ' '}</>;
    }
  }
);

WordInput.displayName = 'WordInput';
export default WordInput;
