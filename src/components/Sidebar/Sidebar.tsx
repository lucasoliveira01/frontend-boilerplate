import { withTheme } from '@emotion/react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import type { Theme } from '@mui/material';
import {
  Button,
  CircularProgress,
  IconButton,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import type { AggerContent } from '../../types/aggerTypes';
import { backendHttp, useWindowSize } from '../../utils/Utility';
import { useContatoContentContext } from '../Contato/ContatoContentContext';
import ContatoEdition from '../Contato/ContatoEdition';
import { useDepoimentoContentContext } from '../Depoimento/DepoimentoContext';
import DepoimentoEdition from '../Depoimento/DepoimentoEdition';
import { useFormModalContentContext } from '../FormModal/FormModalContext';
import FormModalEdition from '../FormModal/FormModalEdition';
import { useFuncionalidadeContentContext } from '../Funcionalidade/FuncionalidadeContentContext';
import FuncionalidadeEdition from '../Funcionalidade/FuncionalidadeEdition';
import { useAuthContext } from '../Login/AuthContext';
import { useNavbarContentContext } from '../Navbar/NavbarContentContext';
import NavbarEdition from '../Navbar/NavbarEdition';
import { useNossasSolucoesContentContext } from '../NossasSolucoes/NossasSolucoesContentContext';
import NossasSolucoesEdition from '../NossasSolucoes/NossasSolucoesEdition';
import { usePlanoContentContext } from '../Plano/PlanoContentContext';
import PlanoEdition from '../Plano/PlanoEdition/PlanoEdition';
import { useSobreNosContentContext } from '../SobreNos/SobreNosContentContext';
import SobreNosEdition from '../SobreNos/SobreNosEdition';
import EditionAccordion from './EditionAccordion';

interface Props {
  theme: Theme;
  onOpenCallback: (sidebarWidth: number) => void;
  onCloseCallback: () => void;
}

const Sidebar: FC<Props> = (props) => {
  const { theme } = props;

  const [windowsWidth] = useWindowSize();

  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-nested-ternary
  const sidebarWidth = useMediaQuery(theme.breakpoints.up('desktop'))
    ? windowsWidth! / 4 < 400
      ? 400
      : windowsWidth! / 4
    : windowsWidth!;

  const handleOpen = () => {
    setOpen(true);
    props.onOpenCallback(sidebarWidth);
  };

  const handleClose = () => {
    setOpen(false);
    props.onCloseCallback();
  };

  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(
    false
  );
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuthContext();
  const { navbarContent, navbarChanged } = useNavbarContentContext();
  const { contatoContent, contatoChanged } = useContatoContentContext();
  const { sobreNosContent, sobreNosChanged } = useSobreNosContentContext();
  const { depoimentoContent, depoimentoChanged } =
    useDepoimentoContentContext();
  const { nossasSolucoesContent, nossasSolucoesChanged } =
    useNossasSolucoesContentContext();
  const { funcionalidadeContent, funcionalidadeChanged } =
    useFuncionalidadeContentContext();
  const { planoContent, planoChanged } = usePlanoContentContext();
  const { formModalContent, formModalChanged } = useFormModalContentContext();
  const [updatePayload, setUpdatePayload] = useState<Partial<AggerContent>>({});

  useEffect(() => {
    const payload: Partial<AggerContent> = { ...updatePayload };

    payload.nav = navbarChanged ? navbarContent : undefined;
    payload.contato = contatoChanged ? contatoContent : undefined;
    payload.sobreNos = sobreNosChanged ? sobreNosContent : undefined;
    payload.depoimento = depoimentoChanged ? depoimentoContent : undefined;
    payload.nossasSolucoes = nossasSolucoesChanged
      ? nossasSolucoesContent
      : undefined;
    payload.funcionalidade = funcionalidadeChanged
      ? funcionalidadeContent
      : undefined;
    payload.plano = planoChanged ? planoContent : undefined;
    payload.formModal = formModalChanged ? formModalContent : undefined;

    setUpdatePayload(payload);
  }, [
    navbarChanged,
    contatoChanged,
    sobreNosChanged,
    depoimentoChanged,
    nossasSolucoesChanged,
    funcionalidadeChanged,
    planoChanged,
    formModalChanged,
  ]);

  const handleAccordionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpanded(isExpanded ? panel : false);
    };

  // if (!logedIn) {
  //   return <><h1></h1></>;
  // }

  const handleUpdateContent = async () => {
    const token = getToken();
    if (token) {
      setLoading(true);
      await backendHttp.patch('/all', updatePayload);
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box
        bgcolor="primary.main"
        sx={{
          position: 'fixed',
          top: '50%',
          border: '1px solid white',
          borderLeft: 0,
          borderRadius: '0 25px 25px 0',
          zIndex: 9,
        }}
      >
        <IconButton
          sx={{
            color: '#fff',
            paddingLeft: 0,
          }}
          onClick={handleOpen}
        >
          <ChevronRight />
        </IconButton>
      </Box>
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          position: 'relative',
          [`& > .MuiDrawer-paper`]: {
            width: sidebarWidth,
            boxSizing: 'border-box',
            height: 'calc(100% - 65px)',
            paddingBottom: '30px',
          },
          [`& > .MuiPaper-root`]: {
            overflowX: 'hidden',
            overflowY: 'auto',
          },
        }}
      >
        <Box
          sx={{ overflow: 'visible', position: 'relative', minHeight: '100%' }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              direction: 'row',
              justifyContent: 'end',
            }}
          >
            <IconButton onClick={handleClose}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <EditionAccordion
            identification="menu"
            identificationAlias="Menu"
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <NavbarEdition />
          </EditionAccordion>
          <EditionAccordion
            identification="contato"
            identificationAlias="Inicio"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <ContatoEdition />
          </EditionAccordion>
          <EditionAccordion
            identification="sobreNos"
            identificationAlias="Sobre nós"
            onClick={() => {
              document.querySelector('#sobre_nos_section')?.scrollIntoView();
            }}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <SobreNosEdition />
          </EditionAccordion>
          <EditionAccordion
            identification="depoimento"
            identificationAlias="Depoimentos"
            onClick={() => {
              document.querySelector('#depoimentos_section')?.scrollIntoView();
            }}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <DepoimentoEdition />
          </EditionAccordion>
          <EditionAccordion
            identification="nossasSolucoes"
            identificationAlias="Nossas soluções"
            onClick={() => {
              document
                .querySelector('#nossas_solucoes_section')
                ?.scrollIntoView();
            }}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <NossasSolucoesEdition />
          </EditionAccordion>
          <EditionAccordion
            identification="funcionalidades"
            identificationAlias="Funcionalidades"
            onClick={() => {
              document
                .querySelector('#funcionalidades_section')
                ?.scrollIntoView();
            }}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <FuncionalidadeEdition />
          </EditionAccordion>
          <EditionAccordion
            identification="plano"
            identificationAlias="Planos"
            onClick={() => {
              document.querySelector('#planos_section')?.scrollIntoView();
            }}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <PlanoEdition />
          </EditionAccordion>
          <EditionAccordion
            identification="formModal"
            identificationAlias="Modal de Formulário"
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <FormModalEdition />
          </EditionAccordion>
        </Box>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            backgroundColor: 'white',
            width: sidebarWidth,
            zIndex: 10,
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            boxSizing: 'border-box',
          }}
        >
          <Divider />
          <Toolbar
            sx={{
              display: 'flex',
              direction: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <Box position="relative">
              <Button
                type="submit"
                disabled={loading}
                variant="contained"
                onClick={handleUpdateContent}
              >
                Atualizar
              </Button>
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
          </Toolbar>
        </Box>
      </Drawer>
    </Box>
  );
};

export default withTheme(Sidebar);
