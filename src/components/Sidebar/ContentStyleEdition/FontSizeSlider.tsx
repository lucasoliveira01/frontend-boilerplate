/* eslint-disable no-nested-ternary */
import { Input, Slider, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import React, { memo, useState } from 'react';

import { createStyledAggerTheme } from '../../../utils/Utility';

interface Props {
  fontSize: string;
  onChange: (fontSize: string) => void;
}

const styled = createStyledAggerTheme();

const StyledSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-valueLabelOpen': {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '1px 1px 4px 0px #0000006b',
  },
  '& .MuiSlider-valueLabelLabel': {
    color: 'white',
  },
  '& .MuiSlider-markLabel': {
    color: theme.palette.primary.main,
  },
}));

const StyledInput = styled(Input)(({ theme }) => ({
  width: '55px',
  height: '30px',
  color: theme.palette.primary.main,
}));

const FontSizeSlider: FC<Props> = (props) => {
  const marks = [
    {
      label: 'Texto',
      value: 1.1,
    },
    {
      label: 'Titulo',
      value: 2.9,
    },
    {
      label: 'Numero',
      value: 4,
    },
  ];

  const [value, setValue] = useState(parseInt(props.fontSize.slice(0, -3), 10));

  const handleChange = (_e: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
      props.onChange(`${newValue}rem`);
    }
  };

  const handleValueLabel = (value: number) => {
    return `${value}rem`;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue =
      event.target.value === '' ? 0 : Number(event.target.value);

    handleChange(
      event as any,
      inputValue < 0 ? 0 : inputValue > 4.5 ? 4.5 : inputValue
    );
  };

  return (
    <Stack spacing={0}>
      <Typography>Tamanho da Fonte</Typography>
      <Stack direction="row" spacing={1}>
        <StyledSlider
          value={value as number}
          min={0}
          step={0.01}
          marks={marks}
          max={4.5}
          valueLabelFormat={handleValueLabel}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
        <StyledInput
          value={value as number}
          size="small"
          type="number"
          onChange={handleInputChange}
          inputProps={{
            step: 0.01,
            min: 0,
            max: 4.5,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Stack>
    </Stack>
  );
};

export default memo(FontSizeSlider);
