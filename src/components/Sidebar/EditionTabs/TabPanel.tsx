import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';
import type { FC, ReactNode } from 'react';
import React from 'react';

// const styled = createStyledAggerTheme();

interface Props extends BoxProps {
  children?: ReactNode;
  tabActive: number;
  index: number;
}

const TabPanel: FC<Props> = (props) => {
  if (props.tabActive === props.index) {
    return <Box>{props.children}</Box>;
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default TabPanel;
