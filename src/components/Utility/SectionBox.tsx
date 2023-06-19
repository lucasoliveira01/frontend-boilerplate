/* eslint-disable react/display-name */
import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';
import type { FC } from 'react';
import React, { forwardRef } from 'react';

import { createStyledAggerTheme } from '../../utils/Utility';

interface Props extends BoxProps {}

const styled = createStyledAggerTheme();

const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '550px',
  display: 'flex',
  alignContent: 'center',
  padding: `${theme.spacing(4)} 0`,
  [theme.breakpoints.down('lg')]: {
    padding: `${theme.spacing(8)} ${theme.spacing(8)}`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(8)} ${theme.spacing(2)}`,
  },
})) as typeof Box;

const SectionBox: FC<Props> = forwardRef((props) => {
  return <StyledBox component="section" {...props} />;
});

export default SectionBox;
