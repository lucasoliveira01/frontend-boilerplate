/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable unused-imports/no-unused-vars */
import type { FC, ReactElement } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import type { TextContent } from '../../types/aggerTypes';
import { EDITABLE_TYPES } from '../../types/aggerTypes';
import { backendHttp } from '../../utils/Utility';
import type { PlanoContent, PlanoEditablePlan } from './PlanoType';
import { isEditablePlanoType, planoSkeletonContent } from './PlanoType';

interface Props {
  children: ReactElement | ReactElement[];
}

export const PlanoContentContext = createContext({
  planoContent: planoSkeletonContent,
  updatePlanoContent: (_arg0: PlanoContent) => {},
  addPackageItem: (_planoIndex: number) => {},
  deletePackageItem: (_planoIndex: number, _packageIndex: number) => {},
  addLicence: (_planoIndex: number) => {},
  deleteLicence: (_planoIndex: number, _licenceIndex: number) => {},
  planoChanged: false,
});

export const usePlanoContentContext = () => {
  return useContext(PlanoContentContext);
};

export const PlanoContentProvider: FC<Props> = (props) => {
  const [planoContent, setPlanoContent] = useState(planoSkeletonContent);
  const [changed, setChanged] = useState(false);

  const filterNotPlano = (item: TextContent | PlanoEditablePlan) => {
    return item.type !== EDITABLE_TYPES.PLANO;
  };

  const filterPlano = (item: TextContent | PlanoEditablePlan) => {
    return item.type === EDITABLE_TYPES.PLANO;
  };

  useEffect(() => {
    backendHttp.get('/plan').then((res) => {
      if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
        const newPlanoContent = {
          texts: res.data.filter(filterNotPlano),
          planos: res.data.filter(filterPlano),
        };
        if (isEditablePlanoType(newPlanoContent)) {
          setPlanoContent(newPlanoContent);
        }
      }
    });
  }, []);

  const addPackageItem = (planoIndex: number) => {
    const newPlanoContent = { ...planoContent };
    const newPackageItem: TextContent = {
      ...newPlanoContent.planos[planoIndex]!.packageItems[0],
      key: `Item Pacote ${newPlanoContent.planos[planoIndex]!.packageItems!
        .length!}`,
      text: '<p>Novo Item</p>',
      style: { ...newPlanoContent.planos[planoIndex]!.packageItems[0]!.style },
    };

    newPlanoContent.planos[planoIndex]!.packageItems.push(newPackageItem);

    setPlanoContent(newPlanoContent);
    setChanged(true);
  };

  const deletePackageItem = (planoIndex: number, packageItemIndex: number) => {
    if (planoContent.planos[planoIndex]!.packageItems.length > 1) {
      const newPlanoContent = { ...planoContent };
      newPlanoContent.planos[planoIndex]!.packageItems.splice(
        packageItemIndex,
        1
      );
      setChanged(true);
    }
  };

  const addLicence = (planoIndex: number) => {
    const newPlanoContent = { ...planoContent };
    const newLicence = {
      ...newPlanoContent.planos[planoIndex]!.licences[0],
      key: `Licensa ${newPlanoContent.planos[planoIndex]!.licences.length}`,
      description: 'Nova Licença',
      price: {
        ...newPlanoContent.planos[planoIndex]!.licences[0]!.price,
        text: '0',
        style: {
          ...newPlanoContent.planos[planoIndex]!.licences[0]!.price.style,
        },
      },
    };

    newPlanoContent.planos[planoIndex]!.licences.push(newLicence);
    setPlanoContent(newPlanoContent);
    setChanged(true);
  };

  const deleteLicence = (planoIndex: number, licenceIndex: number) => {
    if (planoContent.planos[planoIndex]!.licences.length > 1) {
      const newPlanoContent = { ...planoContent };
      newPlanoContent.planos[planoIndex]!.licences.splice(licenceIndex, 1);
      setChanged(true);
    }
  };

  return (
    <PlanoContentContext.Provider
      value={{
        planoContent,
        updatePlanoContent: (planoContent) => {
          setPlanoContent(planoContent);
          setChanged(true);
        },
        addPackageItem,
        deletePackageItem,
        addLicence,
        deleteLicence,
        planoChanged: changed,
      }}
    >
      {props.children}
    </PlanoContentContext.Provider>
  );
};

export default PlanoContentProvider;
