/* eslint-disable react/display-name */
import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';
import type { FC } from 'react';
import React, { forwardRef } from 'react';

import { createStyledAggerTheme } from '../../utils/Utility';

interface Props extends BoxProps {}

const styled = createStyledAggerTheme();

const CenterModalBox: FC<Props> = forwardRef((props) => {
  const StyledBox = styled(Box)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '300px',
    backgroundColor: '#fff',
    border: '0.5px solid #fff',
    borderRadius: '10px',
  })) as typeof Box;

  return <StyledBox {...props} />;
});

export default CenterModalBox;
