import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Slide } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import type { FC } from 'react';
import React from 'react';

import { getHtmlInnerText } from '../../utils/Utility';
import { usePlanoContentContext } from '../Plano/PlanoContentContext';
import type { SelectedPlanoInformation } from '../Plano/PlanoType';
import EditableFormModal from './EditableFormModal/EditableFormModal';
import { useFormModalContentContext } from './FormModalContext';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  selectedPlanoIndexInformation: SelectedPlanoInformation;
}

const FormModalSection: FC<Props> = (props) => {
  const { formModalContent, openFormModal, hideFormModal } =
    useFormModalContentContext();
  const { planoContent } = usePlanoContentContext();

  const planSelectedLicence =
    planoContent.planos[props.selectedPlanoIndexInformation.planIndex]!
      .licences[props.selectedPlanoIndexInformation.licenceIndex];
  const planPrice = parseInt(
    getHtmlInnerText(planSelectedLicence!.price.text),
    10
  );

  return (
    <Dialog
      open={openFormModal}
      onClose={hideFormModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock
      scroll="body"
      fullScreen
      TransitionComponent={Transition}
      sx={{ overflowX: 'hidden', fontFamily: '__Asap_ff27c1' }}
    >
      <CloseIcon
        sx={{
          position: 'fixed',
          top: '15px',
          right: '15px',
          cursor: 'pointer',
        }}
        onClick={hideFormModal}
      />
      <EditableFormModal
        type={planPrice > 0 ? 'hireAPI' : 'contato'}
        contrateFormEditableForm={
          planPrice > 0
            ? formModalContent.forms[0]!
            : formModalContent.forms[1]!
        }
        selectedPlanoIndexInformation={props.selectedPlanoIndexInformation}
      />
    </Dialog>
  );
};

export default FormModalSection;
