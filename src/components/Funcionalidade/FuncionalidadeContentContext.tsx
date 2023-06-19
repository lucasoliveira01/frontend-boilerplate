/* eslint-disable react/jsx-no-constructed-context-values */
import type { FC, ReactElement } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import type { TextContent } from '../../types/aggerTypes';
import { EDITABLE_TYPES } from '../../types/aggerTypes';
import { backendHttp } from '../../utils/Utility';
import type {
  FuncionalidadeContent,
  FuncionalidadeEditableFuncionality,
} from './FuncionalidadeType';
import {
  funcionalidadeSkeletonContent,
  isEditableFuncionalidadeType,
} from './FuncionalidadeType';

interface Props {
  children: ReactElement | ReactElement[];
}

export const FuncionalidadeContentContext = createContext({
  funcionalidadeContent: funcionalidadeSkeletonContent,
  updateFuncionalidadeContent: (_arg0: FuncionalidadeContent) => {},
  funcionalidadeChanged: false,
});

export const useFuncionalidadeContentContext = () => {
  return useContext(FuncionalidadeContentContext);
};

export const FuncionalidadeContentProvider: FC<Props> = (props) => {
  const [funcionalidadeContent, setFuncionalidadeContent] = useState(
    funcionalidadeSkeletonContent
  );
  const [changed, setChanged] = useState(false);

  const filterNotFuncionalidades = (
    item: TextContent | FuncionalidadeEditableFuncionality
  ) => {
    return item.type !== EDITABLE_TYPES.FUNCIONALIDADE;
  };

  const filterFuncionalidades = (
    item: TextContent | FuncionalidadeEditableFuncionality
  ) => {
    return item.type === EDITABLE_TYPES.FUNCIONALIDADE;
  };

  useEffect(() => {
    backendHttp.get('/functionality').then((res) => {
      if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
        const newFuncionalidadeContent = {
          texts: res.data.filter(filterNotFuncionalidades),
          funcionalidades: res.data.filter(filterFuncionalidades),
        };

        if (isEditableFuncionalidadeType(newFuncionalidadeContent)) {
          setFuncionalidadeContent(newFuncionalidadeContent);
        }
      }
    });
  }, []);

  return (
    <FuncionalidadeContentContext.Provider
      value={{
        funcionalidadeContent,
        updateFuncionalidadeContent: (funcionalidadeContent) => {
          setFuncionalidadeContent(funcionalidadeContent);
          setChanged(true);
        },
        funcionalidadeChanged: changed,
      }}
    >
      {props.children}
    </FuncionalidadeContentContext.Provider>
  );
};

export default FuncionalidadeContentProvider;
