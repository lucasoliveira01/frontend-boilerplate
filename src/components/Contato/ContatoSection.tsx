import type { BoxProps, GridProps } from '@mui/material';
import { Box, CircularProgress, Grid, Stack, useTheme } from '@mui/material';
import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';
import type { FC } from 'react';
import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import * as Yup from 'yup';

import {
  backendHttp,
  createStyledAggerTheme,
  scrollTo,
} from '../../utils/Utility';
import FormikTextField from '../FormikTextField/FormikTextField';
import { EditableButton } from '../GenericEditableContent/EditableButton';
import { EditableTypography } from '../GenericEditableContent/EditableTypography';
import AlertDialog from '../Modal/AlertDialog';
import SectionBox from '../Utility/SectionBox';
import { useContatoContentContext } from './ContatoContentContext';

interface Props extends BoxProps {
  gridDefaultProps: GridProps;
}

const styled = createStyledAggerTheme();

const StyledFormikTextField = styled(FormikTextField)(() => ({
  color: 'white',
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInput-root:before, & .MuiInput-root:hover:not(.Mui-disabled):before, & .MuiInput-root:after':
    {
      borderColor: 'white',
    },
  '& .MuiInputLabel-shrink, .MuiInputLabel-root.Mui-focused': {
    color: 'white',
  },
}));

const StyledButton = styled(EditableButton)(({ theme }) => ({
  padding: '10px 0',
  borderRadius: '25px',
  '&:hover': {
    backgroundColor: `${theme.palette.highlight.main}`,
    color: '#fff',
  },
  '&:hover p, &:hover span': {
    color: '#fff',
  },
  '&:disabled': {
    backgroundColor: '#fbbb2173',
  },
}));

const StyledActionButton = styled(EditableButton)(({ theme }) => ({
  padding: '10px 20px',
  borderRadius: '25px',
  '&:hover': {
    backgroundColor: `${theme.palette.highlight.main}`,
    color: '#fff',
  },
  '&:hover p, &:hover span': {
    color: '#fff',
  },
}));

interface FormValues {
  name: string;
  email: string;
  telephone: string;
}

const ContatoSection: FC<Props> = (props) => {
  const theme = useTheme();
  const { contatoContent, saveContatoFormInformation } =
    useContatoContentContext();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const formValidade = Yup.object().shape({
    name: Yup.string().required('Obrigatório').trim(),
    email: Yup.string().email('Email invalido').required('Obrigatório').trim(),
    telephone: Yup.string()
      .required('Obrigatório')
      .matches(
        /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/,
        'Porfavor insira um telefone válido'
      ),
  });

  const formInitialValues: FormValues = {
    name: '',
    email: '',
    telephone: '',
  };

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async (
    values: FormValues,
    formikHelper: FormikHelpers<FormValues>
  ) => {
    setLoading(true);

    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('formulario_contato');
    let passedScore = false;
    try {
      const captchaResponse = await backendHttp.post('/google/recaptcha', {
        token,
      });
      passedScore = captchaResponse.data;
    } catch (e) {
      passedScore = false;
    }

    if (passedScore) {
      try {
        const res = await backendHttp.post('/rdstation/conversion', {
          conversion_identifier: 'formulário de contato inicial',
          email: values.email,
          cf_nome_da_corretora: values.name,
          cf_nome_para_contato: values.name,
          personal_phone: values.telephone,
          tags: ['site', 'formulário_contato_inicial'],
        });

        if (res.data) {
          formikHelper.resetForm();
        }
      } catch (e) {
        console.log(e);
      }

      saveContatoFormInformation({
        name: values.name,
        email: values.email,
        personal_phone: values.telephone,
      });
      setOpen(true);
      scrollTo('#planos_section');
    }

    setLoading(false);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <SectionBox id="contato_section">
      <Grid {...props.gridDefaultProps}>
        <Grid item md={6}>
          <EditableTypography
            text={contatoContent.texts[0]!}
            sx={{ paddingBottom: '20px' }}
          />
          <EditableTypography text={contatoContent.texts[1]!} />
        </Grid>
        <Grid
          item
          md={6}
          display="flex"
          sx={{ justifyContent: { xs: 'center', md: 'end' } }}
        >
          <Stack width={{ xs: '100%', sm: '80%' }} spacing={2}>
            <Box
              bgcolor={theme.palette.primary.main}
              minHeight="360px"
              borderRadius="25px"
              p={4}
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
            >
              <EditableTypography text={contatoContent.texts[2]!} />
              <Formik
                initialValues={formInitialValues}
                validationSchema={formValidade}
                onSubmit={onSubmit}
              >
                <Form>
                  <Stack spacing={1}>
                    <StyledFormikTextField
                      size="small"
                      label="Nome"
                      name="name"
                      fullWidth
                      variant="standard"
                    />
                    <StyledFormikTextField
                      size="small"
                      label="E-mail"
                      name="email"
                      fullWidth
                      variant="standard"
                      type="email"
                    />
                    <StyledFormikTextField
                      size="small"
                      label="Telefone"
                      name="telephone"
                      fullWidth
                      variant="standard"
                      formated="BrazilCellphone"
                    />
                  </Stack>
                  <Box position="relative" marginTop={5}>
                    <StyledButton
                      type="submit"
                      disabled={loading}
                      fullWidth
                      button={contatoContent.texts[3]!}
                      disableElevation
                    />
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: 'primary',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    )}
                  </Box>
                </Form>
              </Formik>
            </Box>
            <EditableTypography
              text={contatoContent.texts[4]!}
              sx={{ px: 4 }}
            />
          </Stack>
        </Grid>
      </Grid>
      <AlertDialog
        dialogTitle={
          <EditableTypography text={contatoContent.popUps[0]!.title} />
        }
        dialogContent={
          <EditableTypography text={contatoContent.popUps[0]!.content} />
        }
        dialogAction={
          contatoContent.popUps[0]!.actionButton ? (
            <Box width="100%" sx={{ textAlign: 'center' }}>
              <StyledActionButton
                button={contatoContent.popUps[0]!.actionButton}
                onClick={closeModal}
              />
            </Box>
          ) : undefined
        }
        open={open}
        setOpen={setOpen}
      />
    </SectionBox>
  );
};

export default ContatoSection;
