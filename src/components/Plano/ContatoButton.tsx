import { useTheme } from '@mui/material';
import type { FC } from 'react';
import { useState } from 'react';

import AggerTheme from '../../utils/AggerTheme';
import { createStyledAggerTheme } from '../../utils/Utility';
import { useFormModalContentContext } from '../FormModal/FormModalContext';
import EditableButton from '../GenericEditableContent/EditableButton';
import type { PlanoEditablePlan, SelectedPlanoInformation } from './PlanoType';

const styled = createStyledAggerTheme();

interface ContatoProps {
  plano: PlanoEditablePlan;
  onSelectPlan: (licenceIndex: number) => void;
}

const StyledEditableButton = styled(EditableButton)(({ theme }) => ({
  padding: '15px 50px',
  borderRadius: '25px',
  '&:hover': {
    backgroundColor: `${AggerTheme.palette.primary.light}`,
    color: '#fff',
  },
  '&:hover p, &:hover span': {
    color: '#fff',
  },
}));

export const ContatoButton: FC<ContatoProps> = (props) => {
  const theme = useTheme();

  const [selectedLicence, setSelectedLicence] = useState(0);

  const [selectedPlanoIndexInformation, settSelectedPlanoIndexInformation] =
    useState<SelectedPlanoInformation>({
      planIndex: 0,
      licenceIndex: 0,
    });

  const { showFormModal } = useFormModalContentContext();

  const { plano } = props;

  const handleContrate = () => {
    props.onSelectPlan(selectedLicence);
    showFormModal();
  };

  return (
    <StyledEditableButton
      button={plano.requestContactButton}
      onClick={handleContrate}
      disableElevation
    />
  );
};

export default ContatoButton;
