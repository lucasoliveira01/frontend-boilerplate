import {
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import Logo from '../../../../public/assets/images/logo-agger.webp';
import AggerTheme from '../../../utils/AggerTheme';
import { backendHttp } from '../../../utils/Utility';
import { EditableTypography } from '../../GenericEditableContent/EditableTypography';
import type { SelectedPlanoInformation } from '../../Plano/PlanoType';
import type { FormModalEditableForm } from '../FormModalType';
import EditableFormModalDescription from './EditableFormModalDescription';
import EditableContrateFormForm from './EditableFormModalForm';

interface IpInformation {
  country_code: string;
  country_name: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  IPv4: string;
  state: string;
}

interface Props {
  type: 'hireAPI' | 'contato';
  contrateFormEditableForm: FormModalEditableForm;
  selectedPlanoIndexInformation: SelectedPlanoInformation;
}

const EditableFormModal: FC<Props> = (props) => {
  const theme = useTheme();
  const upToDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const upToLaptop = useMediaQuery(theme.breakpoints.up('laptop'));

  const [ipInformation, setIpInformation] = useState<IpInformation>();
  useEffect(() => {
    backendHttp.get('https://geolocation-db.com/json/').then((res) => {
      setIpInformation(res.data as IpInformation);
    });
  }, []);

  return (
    <Grid
      container
      maxWidth="desktop"
      justifyContent={upToDesktop ? 'space-between' : 'space-evenly'}
      m="auto"
      columnGap={2}
      rowGap={upToLaptop ? 0 : 5}
      direction="row"
      wrap="wrap"
      alignItems="center"
      alignContent="flex-start"
      height="auto"
      minHeight="100%"
      py={8}
      px={upToLaptop ? 0 : 5}
      marginBottom={upToLaptop ? 0 : 4}
      overflow="hidden"
    >
      <Grid item xs={12} paddingBottom="50px">
        {upToLaptop && (
          <Divider
            sx={{
              '::after, ::before': {
                borderColor: AggerTheme.palette.primary.main,
                borderWidth: '2px',
              },
            }}
          >
            <EditableTypography text={props.contrateFormEditableForm.title} />
          </Divider>
        )}
        {!upToLaptop && (
          <EditableTypography
            text={props.contrateFormEditableForm.title}
            textAlign="center"
          />
        )}
      </Grid>
      <Grid item xs={upToLaptop ? 4 : 12}>
        <Stack spacing={2}>
          <Box>
            <Image src={Logo} width={250} alt="Logo Agger" />
          </Box>
          {props.contrateFormEditableForm.descriptions.map((description) => {
            return (
              <EditableFormModalDescription
                key={description.key}
                description={description}
              />
            );
          })}
          <Typography color="text.primary" variant="body1" hidden>
            Seu IP: {ipInformation?.IPv4}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={upToLaptop ? 7 : 12}>
        <EditableContrateFormForm
          type={props.type}
          selectedPlanoIndexInformation={props.selectedPlanoIndexInformation}
          submitButton={props.contrateFormEditableForm.submitButton}
          ipInformation={{
            IP: ipInformation?.IPv4 ? ipInformation?.IPv4 : '',
            countryName: ipInformation?.country_name
              ? ipInformation?.country_name
              : '',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default EditableFormModal;
