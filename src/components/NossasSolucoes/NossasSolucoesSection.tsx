import type { BoxProps, GridProps } from '@mui/material';
import { Grid, useTheme } from '@mui/material';
import type { FC } from 'react';
import React from 'react';

import { EditableTypography } from '../GenericEditableContent/EditableTypography';
import SectionBox from '../Utility/SectionBox';
import { EditableSolucao } from './EditableSolucao';
import { useNossasSolucoesContentContext } from './NossasSolucoesContentContext';

interface Props extends BoxProps {
  gridDefaultProps: GridProps;
}

const NossasSolucoesSection: FC<Props> = (props) => {
  const theme = useTheme();

  const { nossasSolucoesContent } = useNossasSolucoesContentContext();

  return (
    <SectionBox
      component="section"
      id="nossas_solucoes_section"
      paddingTop={theme.spacing(10)}
    >
      <Grid
        {...props.gridDefaultProps}
        rowGap={{ xs: 6, md: 0 }}
        alignItems="center"
      >
        <Grid item md={12} order={0}>
          <EditableTypography text={nossasSolucoesContent.texts[0]!} />
        </Grid>

        {nossasSolucoesContent.solutions.map((solution, index) => {
          return (
            <EditableSolucao
              key={index}
              lastItem={nossasSolucoesContent.solutions.length - 1 === index}
              // gridProps={props.gridDefaultProps}
              solution={solution}
              imagePosition={index % 2 === 0 ? 'rgt' : 'lft'}
            />
          );
        })}
      </Grid>
    </SectionBox>
  );
};

export default NossasSolucoesSection;
