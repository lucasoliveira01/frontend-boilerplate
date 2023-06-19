/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-constructed-context-values */
import type { FC, ReactElement } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import type { TextContent } from '../../types/aggerTypes';
import { EDITABLE_TYPES } from '../../types/aggerTypes';
import { backendHttp } from '../../utils/Utility';
import type {
  NossasSolucoesContent,
  NossasSolucoesEditableSolution,
} from './NossasSolucoesType';
import {
  isEditableNossasSolucoesType,
  nossasSolucoesSkeletonContent,
} from './NossasSolucoesType';

interface Props {
  children: ReactElement | ReactElement[];
}

export const NossasSolucoesContentContext = createContext({
  nossasSolucoesContent: nossasSolucoesSkeletonContent,
  updateNossasSolucoesContent: (_arg0: NossasSolucoesContent) => {},
  nossasSolucoesChanged: false,
});

export const useNossasSolucoesContentContext = () => {
  return useContext(NossasSolucoesContentContext);
};

export const NossasSolucoesContentProvider: FC<Props> = (props) => {
  const [nossasSolucoesContent, setNossasSolucoesContent] = useState(
    nossasSolucoesSkeletonContent
  );
  const [changed, setChanged] = useState(false);

  const filterNotSolucao = (
    item: TextContent | NossasSolucoesEditableSolution
  ) => {
    return item.type !== EDITABLE_TYPES.SOLUCAO;
  };

  const filterSolucoes = (
    item: TextContent | NossasSolucoesEditableSolution
  ) => {
    return item.type === EDITABLE_TYPES.SOLUCAO;
  };

  useEffect(() => {
    backendHttp.get('/solutions').then((res) => {
      if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
        const newNossasSolucoesContent = {
          texts: res.data.filter(filterNotSolucao),
          solutions: res.data.filter(filterSolucoes),
        };

        if (isEditableNossasSolucoesType(newNossasSolucoesContent)) {
          setNossasSolucoesContent(newNossasSolucoesContent);
        }
      }
    });
  }, []);

  return (
    <NossasSolucoesContentContext.Provider
      value={{
        nossasSolucoesContent,
        updateNossasSolucoesContent: (nossasSolucoesContent) => {
          setNossasSolucoesContent(nossasSolucoesContent);
          setChanged(true);
        },
        nossasSolucoesChanged: changed,
      }}
    >
      {props.children}
    </NossasSolucoesContentContext.Provider>
  );
};

export default NossasSolucoesContentProvider;
