/* eslint-disable no-nested-ternary */
import type { BoxProps, GridProps } from '@mui/material';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import type { FC } from 'react';
import React from 'react';

import { EditableTypography } from '../GenericEditableContent/EditableTypography';
import SectionBox from '../Utility/SectionBox';
import { EditableNumero } from './EditableNumero';
import { useSobreNosContentContext } from './SobreNosContentContext';

interface Props extends BoxProps {
  gridDefaultProps: GridProps;
}

const SobreNosSection: FC<Props> = (props) => {
  const theme = useTheme();
  const upToDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const upToPlanoMobile = useMediaQuery(theme.breakpoints.up('planoMobile'));
  const { sobreNosContent } = useSobreNosContentContext();

  return (
    <SectionBox id="sobre_nos_section">
      <Grid {...props.gridDefaultProps}>
        <Grid item xs={12}>
          <Box paddingBottom="25px">
            <EditableTypography text={sobreNosContent.texts[0]!} />
          </Box>
          <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            m="auto"
          >
            {sobreNosContent.numbers.map((number, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={upToDesktop ? 4 : upToPlanoMobile ? 6 : 12}
                  py={4}
                  px={3}
                >
                  <EditableNumero numero={number} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </SectionBox>
  );
};

export default SobreNosSection;
