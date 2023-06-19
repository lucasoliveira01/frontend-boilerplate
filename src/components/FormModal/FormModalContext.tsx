/* eslint-disable react/jsx-no-constructed-context-values */
import type { FC, ReactElement } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import type { PopUpContent, TextContent } from '../../types/aggerTypes';
import { EDITABLE_TYPES } from '../../types/aggerTypes';
import { backendHttp } from '../../utils/Utility';
import type { FormModalContent, FormModalEditableForm } from './FormModalType';
import {
  formModalSkeletonContent,
  isEditableFormModalType,
} from './FormModalType';

interface Props {
  children: ReactElement | ReactElement[];
}

export const FormModalContentContext = createContext({
  formModalContent: formModalSkeletonContent,
  // eslint-disable-next-line unused-imports/no-unused-vars
  updateFormModal: (_arg0: FormModalContent) => {},
  formModalChanged: false,
  openFormModal: false,
  showFormModal: () => {},
  hideFormModal: () => {},
});

export const useFormModalContentContext = () => {
  return useContext(FormModalContentContext);
};

export const FormModalContentProvider: FC<Props> = (props) => {
  const [formModalContent, setFormModalContent] = useState(
    formModalSkeletonContent
  );
  const [changed, setChanged] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);

  const filterPopUps = (item: TextContent | PopUpContent) => {
    return item.type === EDITABLE_TYPES.POPUP;
  };

  const filterForm = (
    item: TextContent | PopUpContent | FormModalEditableForm
  ) => {
    return item.type === EDITABLE_TYPES.FORM;
  };

  useEffect(() => {
    backendHttp.get('/form-modal').then((res) => {
      if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
        const newFormModalContent = {
          popUps: res.data.filter(filterPopUps),
          forms: res.data.filter(filterForm),
        };

        if (isEditableFormModalType(newFormModalContent)) {
          setFormModalContent(newFormModalContent);
        }
      }
    });
  }, []);

  return (
    <FormModalContentContext.Provider
      value={{
        formModalContent,
        updateFormModal: (formModal) => {
          setFormModalContent(formModal);
          setChanged(true);
        },
        openFormModal,
        showFormModal: () => {
          setOpenFormModal(true);
        },
        hideFormModal: () => {
          setOpenFormModal(false);
        },
        formModalChanged: changed,
      }}
    >
      {props.children}
    </FormModalContentContext.Provider>
  );
};

export default FormModalContentProvider;
