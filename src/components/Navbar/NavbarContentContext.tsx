/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-constructed-context-values */
import type { FC, ReactElement } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { backendHttp } from '../../utils/Utility';
import type { NavbarContent } from './NavbarType';
import { isNavbarContentType, navbarSkeletonContent } from './NavbarType';

interface Props {
  children: ReactElement | ReactElement[];
}

export const NavbarContentContext = createContext({
  navbarContent: navbarSkeletonContent,
  updateNavbarContent: (_arg0: NavbarContent) => {},
  navbarChanged: false,
});

export const useNavbarContentContext = () => {
  return useContext(NavbarContentContext);
};

export const NavbarContentProvider: FC<Props> = (props) => {
  const [navbarContent, setNavbarContent] = useState(navbarSkeletonContent);
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    backendHttp.get('/nav').then((res) => {
      if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
        const newNavbarContent = { texts: res.data };
        if (isNavbarContentType(newNavbarContent)) {
          setNavbarContent(newNavbarContent);
        }
      }
    });
  }, []);

  return (
    <NavbarContentContext.Provider
      value={{
        navbarContent,
        updateNavbarContent: (navbarContent) => {
          setNavbarContent(navbarContent);
          setChanged(true);
        },
        navbarChanged: changed,
      }}
    >
      {props.children}
    </NavbarContentContext.Provider>
  );
};

export default NavbarContentProvider;
