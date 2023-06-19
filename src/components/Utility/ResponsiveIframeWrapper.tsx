/* eslint-disable react/display-name */
import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';
import type { FC } from 'react';
import React, { forwardRef } from 'react';

import { createStyledAggerTheme } from '../../utils/Utility';

interface Props extends BoxProps {}
const styled = createStyledAggerTheme();

const StyledBox = styled(Box)(() => ({
  position: 'relative',
  paddingBottom: '56.25%',
  overflow: 'hidden',
})) as typeof Box;

const ResponsiveIframeWrapper: FC<Props> = forwardRef((props) => {
  return <StyledBox {...props} />;
});

export default ResponsiveIframeWrapper;
