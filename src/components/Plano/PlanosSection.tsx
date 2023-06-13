import type { BoxProps, GridProps } from '@mui/material';
import { Grid, Stack, useMediaQuery, useTheme } from '@mui/material';
import type { FC } from 'react';
import React, { useState } from 'react';

import type { TextContent } from '../../types/aggerTypes';
import { EDITABLE_TYPES, HTML_TEXT_TAGS } from '../../types/aggerTypes';
import { getHtmlInnerText } from '../../utils/Utility';
import FormModal from '../FormModal/FormModalSection';
import { EditableTypography } from '../GenericEditableContent/EditableTypography';
import SectionBox from '../Utility/SectionBox';
import { ContatoButton } from './ContatoButton';
import { EditablePlano } from './EditablePlano';
import { usePlanoContentContext } from './PlanoContentContext';
import type { SelectedPlanoInformation } from './PlanoType';

interface Props extends BoxProps {
  gridDefaultProps: GridProps;
}

const PlanosSection: FC<Props> = (props) => {
  const { planoContent } = usePlanoContentContext();

  const [selectedPlanoIndexInformation, settSelectedPlanoIndexInformation] =
    useState<SelectedPlanoInformation>({
      planIndex: 0,
      licenceIndex: 0,
    });

  const theme = useTheme();
  const upToLaptop = useMediaQuery(theme.breakpoints.up('laptop'));
  const upToPlanoMobile = useMediaQuery(theme.breakpoints.up('planoMobile'));

  const contatoText: TextContent = {
    text: 'Ficou com alguma dúvida? Clique e entre em contato.',
    type: EDITABLE_TYPES.TEXT,
    htmlTag: HTML_TEXT_TAGS.H5,
    key: 'Placeholder Título',
    style: {
      textAlign: 'start',
      margin: 'auto',
      color: 'white',
    },
  };

  const contato2Text: TextContent = {
    text: 'Fornecedores, seguradoras e demais categorias, clique e entre em contato.',
    type: EDITABLE_TYPES.TEXT,
    htmlTag: HTML_TEXT_TAGS.P,
    key: 'Placeholder Título',
    style: {
      textAlign: 'start',
      margin: 'auto',
      color: 'white',
    },
  };

  return (
    <>
      <FormModal
        selectedPlanoIndexInformation={selectedPlanoIndexInformation}
      />
      <SectionBox
        component="section"
        bgcolor="primary.main"
        id="planos_section"
        py={theme.spacing(10)}
        marginTop={theme.spacing(4)}
      >
        <Grid
          {...props.gridDefaultProps}
          sx={{
            justifyContent: { xs: 'flex-start', lg: 'center' },
          }}
          columnSpacing={upToPlanoMobile ? 3 : 0}
        >
          <Grid item xs={12} paddingTop={theme.spacing(4)}>
            <Stack spacing={2}>
              <EditableTypography text={planoContent.texts[0]!} />
              <EditableTypography text={planoContent.texts[1]!} />
            </Stack>
          </Grid>

          <Grid
            container
            item
            columnSpacing={upToPlanoMobile ? 3 : 0}
            sx={{ marginLeft: { desktop: '-48px' } }}
          >
            {planoContent.planos.map((plano, index) => {
              const handleSelectPlan = (licenceIndex: number) => {
                settSelectedPlanoIndexInformation({
                  planIndex: index,
                  licenceIndex,
                });
              };

              const planoPrice = plano.licences
                ? getHtmlInnerText(plano.licences[0]!.price.text)
                : '0';

              if (planoPrice !== '0') {
                return (
                  <Grid
                    key={plano.key}
                    item
                    // eslint-disable-next-line no-nested-ternary
                    xs={upToLaptop ? 4 : upToPlanoMobile ? 6 : 12}
                    sx={{
                      height: {
                        mobile: 'auto',
                        planoMobile: '50%',
                        laptop: '100%',
                      },
                      boxSizing: 'border-box',
                      marginTop: { mobile: '25px', laptop: 0 },
                    }}
                  >
                    <EditablePlano
                      key={`${plano.key}editablePlano`}
                      plano={plano}
                      onSelectPlan={handleSelectPlan}
                    />
                  </Grid>
                );
              }
              return null;
            })}
          </Grid>

          <Grid item width="100%" alignItems="start">
            <EditableTypography sx={{}} text={contatoText} />

            <EditableTypography
              sx={{
                marginBottom: 3,
              }}
              text={contato2Text}
            />

            {planoContent.planos.map((plano, index) => {
              const handleSelectPlan = (licenceIndex: number) => {
                settSelectedPlanoIndexInformation({
                  planIndex: index,
                  licenceIndex,
                });
              };
              const planoPrice = getHtmlInnerText(
                plano.licences ? plano.licences[0]!.price.text : '0'
              );

              if (planoPrice === '0') {
                return (
                  <ContatoButton
                    key={`${plano.key}contatoButton`}
                    plano={plano}
                    onSelectPlan={handleSelectPlan}
                  />
                );
              }
              return null;
            })}
          </Grid>
        </Grid>
      </SectionBox>
    </>
  );
};

export default PlanosSection;
