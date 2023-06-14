import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import type { GridProps } from '@mui/material';
import {
  Box,
  Container,
  Link,
  Link as LinkIcon,
  Stack,
  ThemeProvider,
} from '@mui/material';
import Image from 'next/image';
import type { FC } from 'react';
import { useState } from 'react';
import CookieConsent from 'react-cookie-consent';

import ContatoSection from '@/components/Contato/ContatoSection';
import { AppContentProvider } from '@/components/Contexts/AppContentContext';
import DepoimentosSection from '@/components/Depoimento/DepoimentosSection';
import FuncionalidadesSection from '@/components/Funcionalidade/FuncionalidadesSection';
import NossasSolucoesSection from '@/components/NossasSolucoes/NossasSolucoesSection';
import Sidebar from '@/components/Sidebar/Sidebar';
import SobreNosSection from '@/components/SobreNos/SobreNosSection';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Theme from '@/utils/AggerTheme';
import { useWindowSize } from '@/utils/Utility';

import Logo from '../../public/assets/images/logoRodape.webp';
import Selo from '../../public/assets/images/Selo.webp';
import Navbar from '../components/Navbar/NavbarSection';
import PlanosSection from '../components/Plano/PlanosSection';

const PageComponent: FC = () => {
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
                      fontFamily:
                        'Asap Regular,Asap Medium,Asap SemiBold,Asap Bold,K2D Thin,K2D ExtraLight,K2D Light,K2D Regular,K2D SemiBold,K2D Bold,K2D ExtraBold',
                      fontSize: '20px',
                    }}
                  >
                    SIGA-NOS
                  </p>

                  <LinkIcon
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
                  </LinkIcon>
                  <LinkIcon
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
                  </LinkIcon>
                  <LinkIcon
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
                  </LinkIcon>
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
              fontFamily:
                'Asap Regular,Asap Medium,Asap SemiBold,Asap Bold,K2D Thin,K2D ExtraLight,K2D Light,K2D Regular,K2D SemiBold,K2D Bold,K2D ExtraBold',
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
              fontFamily:
                'Asap Regular,Asap Medium,Asap SemiBold,Asap Bold,K2D Thin,K2D ExtraLight,K2D Light,K2D Regular,K2D SemiBold,K2D Bold,K2D ExtraBold',
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
          fontFamily: 'Asap Bold',
          background: '#005B87',
          color: 'white',
          fontSize: '15px',
        }}
        buttonStyle={{
          fontFamily: 'Asap Bold',
          color: '#003050',
          fontSize: '15px',
          padding: '15px 50px',
          borderRadius: '25px',
          fontWeight: 'bold',
        }}
        declineButtonStyle={{
          fontFamily: 'Asap Bold',
          color: '#003050',
          fontSize: '15px',
          padding: '15px 50px',
          borderRadius: '25px',
          fontWeight: 'bold',
          background: '#FFD526',
        }}
      >
        <p style={{ fontSize: '16px' }}>
          Este site utiliza apenas cookies necessários, ou seja, aqueles sem os
          quais o site não realizará funções básicas ou operará corretamente.
          Para mais informações sobre o uso de dados pessoais, consulte nossa{' '}
          <Link
            href="https://aggerinstala.blob.core.windows.net/docs/Declaracao_Privacidade.pdf"
            target="_blank"
            style={{ color: 'white' }}
          >
            Declaração de Privacidade.
          </Link>
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
