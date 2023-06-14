import { withTheme } from '@emotion/react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import type { Theme } from '@mui/material';
import { Link, Stack, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import type { FC, MouseEvent, ReactElement } from 'react';
import React, { useEffect, useState } from 'react';

import Logo from '../../../public/assets/images/logo-agger.webp';
import LogoAlternativo from '../../../public/assets/images/logo-alternativo-agger.webp';
import { EDITABLE_TYPES } from '../../types/aggerTypes';
import { createStyledAggerTheme } from '../../utils/Utility';
import { EditableButton } from '../GenericEditableContent/EditableButton';
import { EditableLink } from '../GenericEditableContent/EditableLink';
import { useAuthContext } from '../Login/AuthContext';
import { useNavbarContentContext } from './NavbarContentContext';

interface Props {
  theme: Theme;
}

const NavbarSection: FC<Props> = (props) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [pageTop, setPageTop] = useState(true);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const styled = createStyledAggerTheme();
  const StyledEditableLinkHover = styled(EditableLink)(({ theme }) => ({
    color: pageTop ? '#666666' : `${theme.palette.primary.contrastText}`,
    cursor: 'pointer',
    '& p, & span': {},
    '&:hover': {
      '& p, & span': {
        color: pageTop
          ? `${theme.palette.primary.main}`
          : `${theme.palette.highlight.main}`,
      },
      color: pageTop
        ? `${theme.palette.primary.main}`
        : `${theme.palette.highlight.main}`,
    },
  }));

  const StyledEditableLink = styled(EditableLink)(({ theme }) => ({
    cursor: 'pointer',
    '& p, & span': {
      color: 'inherit',
    },
    '&:hover': {
      '& p, & span': {
        color: `${theme.palette.highlight.main}`,
      },
    },
  }));

  const StyledLinkHover = styled(Link)(({ theme }) => ({
    cursor: 'pointer',
    color: pageTop ? '#666666' : `${theme.palette.primary.contrastText}`,
    fontFamily: 'Asap Regular',
    fontSize: '1.1rem',
    textDecoration: 'none',
    '&:hover': {
      color: pageTop
        ? `${theme.palette.primary.main}`
        : `${theme.palette.highlight.main}`,
    },
  }));

  const StyledEditableButtonHover = styled(EditableButton)(({ theme }) => ({
    marginLeft: theme.spacing(3),
    borderRadius: '25px',
    padding: `12px ${theme.spacing(4)}`,
    cursor: 'pointer',
    backgroundColor: pageTop ? 'none' : theme.palette.highlight.main,
    color: pageTop ? 'none' : '#004564',
    fontWeight: pageTop ? 'none' : 'bold',
    '&:hover': {
      color: pageTop ? theme.palette.primary.contrastText : '#fff',
      backgroundColor: pageTop ? '#004564' : '#ffd61e',
      '& p': {
        color: pageTop ? `${theme.palette.primary.contrastText}` : '#fff',
        backgroundColor: pageTop ? '#004564' : '#ffd61e',
      },
    },
    '& p': {
      zIndex: 2,
      backgroundColor: pageTop ? 'none' : `${theme.palette.highlight.main}`,
    },
    '& span': {
      backgroundColor: 'none',
    },
  }));

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        setPageTop(false);
      } else {
        setPageTop(true);
      }
    });
  }, []);

  const { navbarContent } = useNavbarContentContext();
  const { logedIn, logout } = useAuthContext();

  const { theme } = props;
  const upToLaptop = useMediaQuery(theme.breakpoints.up('laptop'));

  const socialMedias = () => {
    return (
      <Stack direction="row" alignItems="center" spacing={0} ml={2}>
        <Link
          href="https://www.facebook.com/aggersistemas"
          target="_blank"
          rel="noopener"
          sx={{ cursor: 'default' }}
        >
          <FacebookIcon
            sx={{
              cursor: 'pointer',
              width: '20px',
              color: pageTop ? 'primary' : '#fff',
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
              width: '20px',
              color: pageTop ? 'primary' : '#fff',
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
              width: '20px',
              color: pageTop ? 'primary' : '#fff',
              transition: '0.5s transform ease',
              '&:hover': { transform: 'scale(1.1)' },
            }}
          />
        </Link>
      </Stack>
    );
  };

  const navbarLinks = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const navbarLinks: ReactElement[] = [];

    navbarContent.texts.map((n) => {
      if (n.type === EDITABLE_TYPES.BUTTON) {
        if (upToLaptop) {
          if (logedIn) {
            navbarLinks.push(
              <StyledLinkHover key={99} onClick={logout}>
                Logout
              </StyledLinkHover>
            );
          }

          navbarLinks.push(
            <StyledEditableButtonHover
              key={n.key}
              disableElevation
              button={n}
              sx={{ marginLeft: 0 }}
              onClick={() => {
                window.open(n.href);
              }}
            />
          );
        } else {
          if (logedIn) {
            navbarLinks.push(
              <MenuItem onClick={logout} key={99} sx={{ color: '#666666' }}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            );
          }

          navbarLinks.push(
            <MenuItem
              key={`${n.key}+${Math.random() * 100}`}
              onClick={handleCloseNavMenu}
              sx={{ paddingTop: '25px' }}
            >
              <StyledEditableButtonHover
                key={`${n.key}buttonHover`}
                disableElevation
                button={n}
                sx={{ marginLeft: 0 }}
                onClick={() => {
                  window.open(n.href);
                }}
              />
            </MenuItem>
          );
        }
      } else if (upToLaptop) {
        navbarLinks.push(
          <StyledEditableLinkHover
            key={`${n.key}${Math.random() * 100}`}
            link={n}
            whiteSpace="nowrap"
          />
        );
      } else {
        navbarLinks.push(
          <MenuItem
            key={`${n.key}${Math.random() * 100}`}
            onClick={handleCloseNavMenu}
          >
            <StyledEditableLink link={n} />
          </MenuItem>
        );
      }

      return true;
    });

    return navbarLinks;
  };

  return (
    <AppBar
      position="sticky"
      id="navbar"
      elevation={pageTop ? 0 : 1}
      sx={{
        py: pageTop ? theme.spacing(2) : theme.spacing(3),
        background: pageTop ? 'white' : theme.palette.primary.main,
        transition: 'all 0.2s ease',
      }}
    >
      <Container maxWidth="desktop">
        <Toolbar disableGutters>
          <Box
            sx={{ display: { mobile: 'none', laptop: 'flex' }, mr: 1 }}
            alignItems="center"
          >
            <Image
              priority
              src={pageTop ? Logo : LogoAlternativo}
              width={150}
              alt="Aegger logo"
              style={{ cursor: 'pointer' }}
              onClick={() => window.scrollTo(0, 0)}
            />
            {socialMedias()}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { mobile: 'flex', laptop: 'none' },
              order: 1,
              justifyContent: 'flex-end',
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color={pageTop ? 'primary' : 'secondary'}
            >
              <MenuIcon sx={{ width: '1.5em', height: '1.5em' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { mobile: 'block', laptop: 'none' },
                '& .MuiPaper-root': { borderRadius: '15px' },
              }}
              disableScrollLock
            >
              {navbarLinks()}
            </Menu>
          </Box>
          <Box
            sx={{
              display: { mobile: 'flex', laptop: 'none' },
              mr: 1,
              order: 0,
            }}
          >
            <Image
              src={pageTop ? Logo : LogoAlternativo}
              priority
              width={150}
              alt="Agger logo"
              style={{ cursor: 'pointer' }}
              onClick={() => window.scrollTo(0, 0)}
            />
            {socialMedias()}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { mobile: 'none', laptop: 'flex' },
              justifyContent: 'end',
              columnGap: theme.spacing(2),
              px: theme.spacing(2),
              alignItems: 'center',
            }}
          >
            {navbarLinks()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default withTheme(NavbarSection);
