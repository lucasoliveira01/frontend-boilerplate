import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import type { GridProps } from '@mui/material';
import { Box, Link, Stack, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import Image from 'next/image';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import { animateScroll } from 'react-scroll';

import ContatoSection from '@/components/Contato/ContatoSection';
import { AppContentProvider } from '@/components/Contexts/AppContentContext';
import DepoimentosSection from '@/components/Depoimento/DepoimentosSection';
import FuncionalidadesSection from '@/components/Funcionalidade/FuncionalidadesSection';
import Navbar from '@/components/Navbar/NavbarSection';
import NossasSolucoesSection from '@/components/NossasSolucoes/NossasSolucoesSection';
import PlanosSection from '@/components/Plano/PlanosSection';
import Sidebar from '@/components/Sidebar/Sidebar';
import SobreNosSection from '@/components/SobreNos/SobreNosSection';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Theme from '@/utils/AggerTheme';
import { useWindowSize } from '@/utils/Utility';

import Logo from '../../public/assets/images/logoRodape.webp';
import Selo from '../../public/assets/images/Selo.webp';

interface Props {
  contrate?: boolean;
}

const PageComponent: FC<Props> = (props) => {
  const [windowsWidth] = useWindowSize();
  const [mainWidthAvaliable, setMainWidthAvaliable] = useState<number>();
  const [mainMarginLeft, setMainMarginLeft] = useState(0);

  const handleSidebarOpen = (sidebarWidth: number) => {
    if (windowsWidth) setMainWidthAvaliable(windowsWidth - sidebarWidth);
    setMainMarginLeft(sidebarWidth);
  };

  const handleSidebarClose = () => {
    setMainWidthAvaliable(windowsWidth);
    setMainMarginLeft(0);
  };

  const gridContainerDefaultProps: GridProps = {
    container: true,
    rowGap: 6,
    justifyContent: 'center',
    maxWidth: 'desktop',
    m: 'auto',
  };

  useEffect(() => {
    if (props.contrate) {
      const element = document.getElementById('planos_section');

      if (element) {
        const elemRect = element.getBoundingClientRect();
        const offset = elemRect.top + elemRect.top * 0.07;

        animateScroll.scrollTo(offset);
      }
    }
  }, [props.contrate]);

  return (
    <>
      <Sidebar
        onOpenCallback={handleSidebarOpen}
        onCloseCallback={handleSidebarClose}
      />
      <Box
        component="main"
        sx={{
          width: mainWidthAvaliable,
          margin: 0,
          marginLeft: `${mainMarginLeft}px`,
        }}
      >
        <Container disableGutters maxWidth={false} sx={{ width: '100%' }}>
          <Navbar />

          {/** Contato section */}
          <ContatoSection gridDefaultProps={gridContainerDefaultProps} />

          {/** Sobre Nós section  */}
          <SobreNosSection gridDefaultProps={gridContainerDefaultProps} />

          {/** Depoimentos section */}
          <DepoimentosSection gridDefaultProps={gridContainerDefaultProps} />

          {/** Nossas Soluções section */}
          <NossasSolucoesSection gridDefaultProps={gridContainerDefaultProps} />

          {/** Funcionalidades section */}
          <FuncionalidadesSection
            gridDefaultProps={gridContainerDefaultProps}
          />

          {/** Planos section */}
          <PlanosSection gridDefaultProps={gridContainerDefaultProps} />
          <Container maxWidth="desktop">
            <Box
              sx={{
                display: { mobile: 'none', laptop: 'flex' },
                mr: 1,
                my: 2,
                justifyContent: 'space-between',
              }}
            >
              <Image src={Logo} width={210} height={100} alt="Agger logo" />

              <Box sx={{ display: 'flex' }}>
                <Image src={Selo} width={100} alt="Selo Agger" />
                <Stack direction="row" alignItems="center" spacing={0} ml={2}>
                  <p
                    style={{
                      color: '#005b87',
                      fontWeight: 'bold',
                      margin: '0 30px 0 30px',
                      fontSize: '20px',
                    }}
                  >
                    SIGA-NOS
                  </p>

                  <Link
                    href="https://www.facebook.com/aggersistemas"
                    target="_blank"
                    rel="noopener"
                    sx={{ cursor: 'default' }}
                  >
                    <FacebookIcon
                      sx={{
                        cursor: 'pointer',
                        width: '30px',
                        color: 'primary',
                        transition: '0.5s transform ease',
                        '&:hover': { transform: 'scale(1.1)' },
                      }}
                    />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/aggersistemas/?original_referer=https%3A%2F%2Fagger.com.br%2F"
                    target="_blank"
                    rel="noopener"
                    sx={{ cursor: 'default' }}
                  >
                    <LinkedInIcon
                      sx={{
                        cursor: 'pointer',
                        width: '30px',
                        color: 'primary',
                        transition: '0.5s transform ease',
                        '&:hover': { transform: 'scale(1.1)' },
                      }}
                    />
                  </Link>
                  <Link
                    href="https://www.instagram.com/aggersistemas/"
                    target="_blank"
                    rel="noopener"
                    sx={{ cursor: 'default' }}
                  >
                    <InstagramIcon
                      sx={{
                        cursor: 'pointer',
                        width: '30px',
                        color: 'primary',
                        transition: '0.5s transform ease',
                        '&:hover': { transform: 'scale(1.1)' },
                      }}
                    />
                  </Link>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Container>
        <Box
          sx={{
            display: { mobile: 'none', laptop: 'block' },
            background: 'lightgray',
            py: 0.1,
          }}
          alignItems="center"
          textAlign="center"
        >
          <p
            style={{
              fontSize: '20px',
              color: '#005b87',
            }}
            className="text-center"
          >
            ©2023 AGGER. ALL RIGHTS RESERVED | CNPJ 00.585.578/0001-57
          </p>
        </Box>

        <Box
          sx={{
            display: { mobile: 'block', laptop: 'none' },
            background: 'lightgray',
            py: 0.1,
          }}
          alignItems="center"
          textAlign="center"
        >
          <p
            style={{
              fontSize: '12px',
              color: '#005b87',
              fontFamily: 'inherit',
            }}
            className="text-center"
          >
            ©2023 AGGER. ALL RIGHTS RESERVED | CNPJ 00.585.578/0001-57
          </p>
        </Box>
      </Box>

      <CookieConsent
        location="bottom"
        buttonText="CIENTE"
        declineButtonText="REJEITAR"
        cookieName="cookieNotification"
        style={{
          fontFamily: 'inherit',
          background: '#005B87',
          color: 'white',
          fontSize: '15px',
        }}
        buttonStyle={{
          fontFamily: 'inherit',
          color: '#003050',
          fontSize: '15px',
          padding: '15px 50px',
          borderRadius: '25px',
          fontWeight: 'bold',
        }}
        declineButtonStyle={{
          fontFamily: 'inherit',
          color: '#003050',
          fontSize: '15px',
          padding: '15px 50px',
          borderRadius: '25px',
          fontWeight: 'bold',
          background: '#FFD526',
        }}
        /* onAccept={() => {
              
            }} */
      >
        <p style={{ fontSize: '16px' }}>
          Este site utiliza apenas cookies necessários, ou seja, aqueles sem os
          quais o site não realizará funções básicas ou operará corretamente.
          Para mais informações sobre o uso de dados pessoais, consulte nossa{' '}
          <a
            href="https://aggerinstala.blob.core.windows.net/docs/Declaracao_Privacidade.pdf"
            target="_blank"
            style={{ color: 'white' }}
          >
            Declaração de Privacidade.
          </a>
        </p>
      </CookieConsent>
    </>
  );
};

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Agger Sistemas"
          description="Agger Sistemas - Soluções para sua Corretora"
        />
      }
    >
      <ThemeProvider theme={Theme}>
        <AppContentProvider>
          <PageComponent />
        </AppContentProvider>
      </ThemeProvider>
    </Main>
  );
};

export default Index;
