/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable unused-imports/no-unused-vars */
import type { FC, ReactElement } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import type { PopUpContent, TextContent } from '../../types/aggerTypes';
import { EDITABLE_TYPES } from '../../types/aggerTypes';
import { backendHttp } from '../../utils/Utility';
import type { ContatoContent } from './ContatoType';
import { contatoSkeletonContent, isEditableContatoType } from './ContatoType';

interface Props {
  children: ReactElement | ReactElement[];
}

interface ContatoInformation {
  name: string;
  email: string;
  personal_phone: string;
}

export const ContatoContentContext = createContext({
  contatoContent: contatoSkeletonContent,
  updateContatoContent: (_arg0: ContatoContent) => {},
  saveContatoFormInformation: (_arg0: ContatoInformation) => {},
  clearContatoFormInformation: () => {},
  getContatoFormInformation: () => {
    return { name: '', email: '', personal_phone: '' };
  },
  contatoChanged: false,
});

export const useContatoContentContext = () => {
  return useContext(ContatoContentContext);
};

export const ContatoContentProvider: FC<Props> = (props) => {
  const [contatoContent, setContatoContent] = useState(contatoSkeletonContent);
  const [changed, setChanged] = useState(false);

  const filterNotPopUps = (item: TextContent | PopUpContent) => {
    return item.type !== EDITABLE_TYPES.POPUP;
  };

  const filterPopUps = (item: TextContent | PopUpContent) => {
    return item.type === EDITABLE_TYPES.POPUP;
  };

  useEffect(() => {
    backendHttp.get('/contact').then((res) => {
      if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
        const newContatoContent = {
          texts: res.data.filter(filterNotPopUps),
          popUps: res.data.filter(filterPopUps),
        };

        if (isEditableContatoType(newContatoContent)) {
          setContatoContent(newContatoContent);
        }
      }
    });
  }, []);

  const saveContatoFormInformation = (
    contatoInformation: ContatoInformation
  ) => {
    localStorage.setItem(
      'contatoFormInformation',
      JSON.stringify(contatoInformation)
    );
  };

  const clearContatoFormInformation = () => {
    localStorage.removeItem('contatoFormInformation');
  };

  const getContatoFormInformation = () => {
    const storageData = localStorage.getItem('contatoFormInformation');
    return storageData
      ? JSON.parse(storageData)
      : { name: '', email: '', personal_phone: '' };
  };

  return (
    <ContatoContentContext.Provider
      value={{
        contatoContent,
        updateContatoContent: (contatoContent) => {
          setContatoContent(contatoContent);
          setChanged(true);
        },
        saveContatoFormInformation,
        clearContatoFormInformation,
        getContatoFormInformation,
        contatoChanged: changed,
      }}
    >
      {props.children}
    </ContatoContentContext.Provider>
  );
};

export default ContatoContentProvider;
