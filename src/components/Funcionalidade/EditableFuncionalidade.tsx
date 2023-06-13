import type { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import type { FC, ReactElement } from 'react';
import { useState } from 'react';

// ICONS
import { ReactComponent as FuncionalidadeCelularIcon } from '../../../public/assets/images/icone-agilize-seus-calculos-pelo-celular-agger.svg';
import { ReactComponent as FuncionalidadeCelularIconPopup } from '../../../public/assets/images/icone-agilize-seus-calculos-pelo-celular-agger-popup.svg';
import { ReactComponent as FuncionalidadeDocumentoIcon } from '../../../public/assets/images/icone-agilize-seus-documentos-agger.svg';
import { ReactComponent as FuncionalidadeDocumentoIconPopup } from '../../../public/assets/images/icone-agilize-seus-documentos-agger-popup.svg';
import { ReactComponent as FuncionalidadeDocumentoEletronicoIcon } from '../../../public/assets/images/icone-assine-seus-documentos-eletronicamente-agger.svg';
import { ReactComponent as FuncionalidadeDocumentoEletronicoIconPopup } from '../../../public/assets/images/icone-assine-seus-documentos-eletronicamente-agger-popup.svg';
import { ReactComponent as FuncionalidadePDFIcon } from '../../../public/assets/images/icone-importe-seus-pdfs-agger.svg';
import { ReactComponent as FuncionalidadePDFIconPopup } from '../../../public/assets/images/icone-importe-seus-pdfs-agger-popup.svg';
import { ReactComponent as FuncionalidadeDadosClienteIcon } from '../../../public/assets/images/icone-tenha-os-dados-dos-clientes-e-da-sua-corretora-agger.svg';
import { ReactComponent as FuncionalidadeDadosClienteIconPopup } from '../../../public/assets/images/icone-tenha-os-dados-dos-clientes-e-da-sua-corretora-agger-popup.svg';
import AggerTheme from '../../utils/AggerTheme';
import { createStyledAggerTheme } from '../../utils/Utility';
import { EditableButton } from '../GenericEditableContent/EditableButton';
import { EditableLink } from '../GenericEditableContent/EditableLink';
import { EditableTypography } from '../GenericEditableContent/EditableTypography';
import CenterModalBox from '../Modal/CenterModalBox';
import CloseModalIcon from '../Modal/CloseModalIcon';
import type { FuncionalidadeEditableFuncionality } from './FuncionalidadeType';
import { FUNCIONALIDADE_SVG_TYPES } from './FuncionalidadeType';

const styled = createStyledAggerTheme();

interface FuncionalidadeProps {
  funcionalidade: FuncionalidadeEditableFuncionality;
}

interface FuncionalidadeSvgMapType {
  default: {
    [key: string]: any;
  };
  popedUp: {
    [key: string]: any;
  };
}

const FuncionalidadeSvgMap: FuncionalidadeSvgMapType = {
  default: {
    [FUNCIONALIDADE_SVG_TYPES.DOCUMENTO]: FuncionalidadeDocumentoIcon,
    [FUNCIONALIDADE_SVG_TYPES.PDF]: FuncionalidadePDFIcon,
    [FUNCIONALIDADE_SVG_TYPES.CELULAR]: FuncionalidadeCelularIcon,
    [FUNCIONALIDADE_SVG_TYPES.DADOS_CLIENTES]: FuncionalidadeDadosClienteIcon,
    [FUNCIONALIDADE_SVG_TYPES.DOCUMENTO_ELETRONICO]:
      FuncionalidadeDocumentoEletronicoIcon,
  },
  popedUp: {
    [FUNCIONALIDADE_SVG_TYPES.DOCUMENTO]: FuncionalidadeDocumentoIconPopup,
    [FUNCIONALIDADE_SVG_TYPES.PDF]: FuncionalidadePDFIconPopup,
    [FUNCIONALIDADE_SVG_TYPES.CELULAR]: FuncionalidadeCelularIconPopup,
    [FUNCIONALIDADE_SVG_TYPES.DADOS_CLIENTES]:
      FuncionalidadeDadosClienteIconPopup,
    [FUNCIONALIDADE_SVG_TYPES.DOCUMENTO_ELETRONICO]:
      FuncionalidadeDocumentoEletronicoIconPopup,
  },
};

const FuncionalidadePaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  borderRadius: '10px',
  justifyContent: 'center',
  '&:hover': {
    outline: `2.5px solid ${theme.palette.highlight.main}`,
  },
}));

const FuncionalidadeStack = styled(Stack)(() => ({
  position: 'relative',
  height: '300px',
  overflow: 'hidden',
  WebkitMaskImage: 'linear-gradient(180deg, #000 75%, transparent );',
}));

const CenterModalBoxFuncionalidade = styled(CenterModalBox)(({ theme }) => ({
  minWidth: '230px',
  maxWidth: '500px',
  backgroundColor: theme.palette.primary.main,
  border: '0.5px solid #fff',
  borderRadius: '25px',
  padding: theme.spacing(4),
  paddingTop: theme.spacing(6),
})) as typeof Box;

export const EditableFuncionalidade: FC<FuncionalidadeProps> = (
  props
): ReactElement => {
  const [open, setOpen] = useState(false);

  const { funcionalidade } = props;
  const DefaultIcon = FuncionalidadeSvgMap.default[funcionalidade.icon];
  const PopedupIcon = FuncionalidadeSvgMap.popedUp[funcionalidade.icon];

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <FuncionalidadePaper elevation={11}>
        <FuncionalidadeStack spacing={2} py={2} px={4}>
          <DefaultIcon
            style={{
              width: '70px',
              minWidth: '70px',
              height: '60px',
              minHeight: '60px',
            }}
          />
          <EditableTypography text={funcionalidade.title} />
          <EditableTypography text={funcionalidade.description} />
        </FuncionalidadeStack>
        <EditableButton
          button={funcionalidade.popUpButton}
          sx={{
            position: 'absolute',
            bottom: '-20px',
            borderRadius: '25px',
            padding: '8px 28px',
            '&:hover': {
              backgroundColor: AggerTheme.palette.highlight.main,
            },
          }}
          onClick={openModal}
        />
      </FuncionalidadePaper>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
        <CenterModalBoxFuncionalidade>
          <CloseModalIcon closeModal={closeModal} color="white" />
          <Stack spacing={2}>
            <PopedupIcon
              style={{
                position: 'absolute',
                top: '-25px',
                width: '50px',
                minWidth: '50px',
                height: '50px',
                minHeight: '50px',
              }}
            />
            <EditableTypography
              text={funcionalidade.title}
              sx={{
                '& p, & span, & ul': {
                  color: `${AggerTheme.palette.primary.contrastText}`,
                },
              }}
            />
            <EditableTypography
              text={funcionalidade.description}
              sx={{
                '& p, & span, & ul': {
                  color: `${AggerTheme.palette.primary.contrastText}`,
                },
              }}
            />
            <EditableLink
              onClick={closeModal}
              sx={{ cursor: 'pointer' }}
              link={funcionalidade.knowMoreLink}
              target="_blank"
            />
          </Stack>
        </CenterModalBoxFuncionalidade>
      </Modal>
    </>
  );
};

export default EditableFuncionalidade;
