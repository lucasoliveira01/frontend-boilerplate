/* eslint-disable no-param-reassign */
// Icons
import CheckIcon from '@mui/icons-material/Check';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { FC, ReactElement } from 'react';
import { useEffect, useState } from 'react';

import AggerTheme from '../../utils/AggerTheme';
import { createStyledAggerTheme, getHtmlInnerText } from '../../utils/Utility';
import { useFormModalContentContext } from '../FormModal/FormModalContext';
import { EditableButton } from '../GenericEditableContent/EditableButton';
import { EditableTypography } from '../GenericEditableContent/EditableTypography';
import type { PlanoEditablePlan } from './PlanoType';

const styled = createStyledAggerTheme();

const PlanoPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  padding: theme.spacing(3),
  border: `2.5px solid ${theme.palette.primary.main}`,
  borderRadius: '25px',
  boxSizing: 'border-box',
  '&:hover': {
    borderColor: theme.palette.highlight.main,
  },
}));

const PlanoSelect = styled(Select)(({ theme }) => ({
  margin: `${theme.spacing(2)} 0`,
  backgroundColor: '#005b8724',
  borderRadius: 0,
  textAlign: 'center',
  '& .MuiSelect-select': {
    padding: theme.spacing(1),
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 0,
    borderRadius: 0,
    textAlign: 'center',
    borderTop: `1.5px solid ${theme.palette.primary.main}`,
    borderBottom: `1.5px solid ${theme.palette.primary.main}`,
  },
}));

const PlanoItem = styled(MenuItem)(() => ({
  backgroundColor: '#005b8724',
  borderBottom: '1.5px solid black',
}));

const StyledEditableButton = styled(EditableButton)(() => ({
  padding: '15px 0',
  borderRadius: '25px',
  '&:hover': {
    backgroundColor: `${AggerTheme.palette.primary.main}`,
    color: '#fff',
  },
  '&:hover p, &:hover span': {
    color: '#fff',
  },
}));

interface PlanoProps {
  plano: PlanoEditablePlan;
  onSelectPlan: (licenceIndex: number) => void;
}

export const EditablePlano: FC<PlanoProps> = (props): ReactElement => {
  const { plano } = props;
  const [selectedLicence, setSelectedLicence] = useState(0);

  const theme = useTheme();
  const upToPlanoMobile = useMediaQuery(theme.breakpoints.up('planoMobile'));

  useEffect(() => {
    if (upToPlanoMobile) {
      let headerMaxHeight = 0;
      const headers = document.querySelectorAll('.editable-plan-header');

      headers.forEach((header) => {
        headerMaxHeight =
          headerMaxHeight < header.clientHeight
            ? header.clientHeight
            : headerMaxHeight;
      });

      headers.forEach((header) => {
        (header as HTMLElement).style.height = `${headerMaxHeight}px`;
      });
    }
  }, [plano, upToPlanoMobile]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedLicence(parseInt(event.target.value as string, 10));
  };

  const { showFormModal } = useFormModalContentContext();

  const handleContrate = () => {
    props.onSelectPlan(selectedLicence);
    showFormModal();
  };

  const planoPrice = getHtmlInnerText(
    plano.licences[selectedLicence]!.price.text
  );
  const upToLaptop = useMediaQuery(theme.breakpoints.up('laptop'));

  return (
    <PlanoPaper>
      <Stack spacing={0} justifyContent="flex-start" width={1}>
        <Stack spacing={2} className="editable-plan-header">
          <EditableTypography
            text={plano.title}
            paddingBottom={AggerTheme.spacing(2)}
            minHeight="45px"
            boxSizing="border-box"
          />
          <EditableTypography text={plano.description} boxSizing="border-box" />
        </Stack>
        <Grid
          container
          spacing={1}
          paddingY={AggerTheme.spacing(3)}
          boxSizing="border-box"
          alignContent="flex-start"
          sx={{
            cursor: 'default',
            minHeight: { desktop: '260px' },
          }}
        >
          <Grid item xs={12}>
            <Box paddingBottom={2}>
              <Typography
                textAlign="center"
                variant="body1"
                sx={{ cursor: 'default' }}
              >
                INCLUSO
              </Typography>
              <Divider />
            </Box>
          </Grid>
          {plano.packageItems.map((item, index) => {
            return (
              <Grid key={index} item xs={upToLaptop ? 12 : 6}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <CheckIcon sx={{ width: 20, height: 20 }} />
                  <EditableTypography text={item} />
                </Stack>
              </Grid>
            );
          })}
        </Grid>
        <Stack spacing={2} marginTop="auto">
          <PlanoSelect
            value={selectedLicence}
            onChange={handleChange}
            fullWidth
            MenuProps={{
              MenuListProps: { disablePadding: true },
              disableScrollLock: true,
            }}
          >
            {plano.licences.map((licence, index) => {
              return (
                <PlanoItem key={index} value={index}>
                  {licence.description}
                </PlanoItem>
              );
            })}
          </PlanoSelect>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="baseline"
            paddingY={AggerTheme.spacing(2)}
            height="80px"
          >
            {planoPrice !== '0' && (
              <>
                <Typography
                  color="primary"
                  sx={{ cursor: 'default' }}
                  alignSelf="flex-start"
                  marginTop="8px"
                >
                  R$
                </Typography>
                <EditableTypography
                  text={plano.licences[selectedLicence]!.price}
                />
                <Typography color="gray" sx={{ cursor: 'default' }}>
                  /mês
                </Typography>
              </>
            )}
            {planoPrice === '0' && (
              <Typography
                color="primary"
                fontFamily="inherit"
                fontSize="2.5rem"
                sx={{ cursor: 'default' }}
                alignSelf="flex-start"
              >
                Sob consulta
              </Typography>
            )}
          </Stack>
          {planoPrice !== '0' && (
            <StyledEditableButton
              button={plano.buyButton}
              onClick={handleContrate}
              disableElevation
            />
          )}
          {planoPrice === '0' && (
            <StyledEditableButton
              button={plano.requestContactButton}
              onClick={handleContrate}
              disableElevation
            />
          )}
        </Stack>
      </Stack>
    </PlanoPaper>
  );
};

export default EditablePlano;
