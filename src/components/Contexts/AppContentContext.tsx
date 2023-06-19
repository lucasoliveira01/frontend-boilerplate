import type { FC, ReactElement } from 'react';
import React from 'react';

import { ContatoContentProvider } from '../Contato/ContatoContentContext';
import { DepoimentoContentProvider } from '../Depoimento/DepoimentoContext';
import FormModalProvider from '../FormModal/FormModalContext';
import { FuncionalidadeContentProvider } from '../Funcionalidade/FuncionalidadeContentContext';
import { AuthContextProvider } from '../Login/AuthContext';
import { NavbarContentProvider } from '../Navbar/NavbarContentContext';
import { NossasSolucoesContentProvider } from '../NossasSolucoes/NossasSolucoesContentContext';
import { PlanoContentProvider } from '../Plano/PlanoContentContext';
import { SobreNosContentProvider } from '../SobreNos/SobreNosContentContext';

interface Props {
  children: ReactElement | ReactElement[];
}

export const AppContentProvider: FC<Props> = (props) => {
  return (
    <PlanoContentProvider>
      <FormModalProvider>
        <FuncionalidadeContentProvider>
          <NossasSolucoesContentProvider>
            <DepoimentoContentProvider>
              <SobreNosContentProvider>
                <ContatoContentProvider>
                  <AuthContextProvider>
                    <NavbarContentProvider>
                      {props.children}
                    </NavbarContentProvider>
                  </AuthContextProvider>
                </ContatoContentProvider>
              </SobreNosContentProvider>
            </DepoimentoContentProvider>
          </NossasSolucoesContentProvider>
        </FuncionalidadeContentProvider>
      </FormModalProvider>
    </PlanoContentProvider>
  );
};

export default AppContentProvider;
