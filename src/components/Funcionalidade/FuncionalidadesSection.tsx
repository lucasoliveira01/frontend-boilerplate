/* eslint-disable react/no-array-index-key */
import type { BoxProps, GridProps } from '@mui/material';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import type { FC } from 'react';
import React from 'react';

import { EditableTypography } from '../GenericEditableContent/EditableTypography';
import SectionBox from '../Utility/SectionBox';
import EditableFuncionalidade from './EditableFuncionalidade';
import { useFuncionalidadeContentContext } from './FuncionalidadeContentContext';

interface Props extends BoxProps {
  gridDefaultProps: GridProps;
}

const FuncionalidadesSection: FC<Props> = (props) => {
  const theme = useTheme();
  const upToPlanoMobile = useMediaQuery(theme.breakpoints.up('planoMobile'));

  const { funcionalidadeContent } = useFuncionalidadeContentContext();

  return (
    <SectionBox
      component="section"
      id="funcionalidades_section"
      py={{ xs: theme.spacing(10), md: theme.spacing(14) }}
    >
      <Grid
        {...props.gridDefaultProps}
        columnSpacing={4}
        sx={{
          width: { xs: '100%', sm: 'auto' },
          justifyContent: { xs: 'space-between', md: 'flex-start' },
        }}
      >
        <Grid
          item
          xs={12}
          textAlign="center"
          sx={{
            paddingLeft: upToPlanoMobile ? 'inherit' : '0 !important',
          }}
        >
          <EditableTypography text={funcionalidadeContent.texts[0]!} />
          <EditableTypography
            text={funcionalidadeContent.texts[1]!}
            sx={{ paddingTop: '20px' }}
          />
        </Grid>
        {funcionalidadeContent.funcionalidades.map((funcionalidade, index) => {
          return (
            <Grid
              key={index}
              item
              sm={6}
              md={4}
              sx={{
                marginLeft: {
                  xs: `-${theme.spacing(4)}`,
                  sm: index % 2 === 0 ? `-${theme.spacing(3)}` : 0,
                  md: index % 3 === 0 ? `-${theme.spacing(3)}` : 0,
                },
              }}
            >
              <EditableFuncionalidade funcionalidade={funcionalidade} />
            </Grid>
          );
        })}
      </Grid>
    </SectionBox>
  );
};

export default FuncionalidadesSection;
