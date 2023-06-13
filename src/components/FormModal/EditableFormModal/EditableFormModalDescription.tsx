import { Stack } from '@mui/material';
import type { FC } from 'react';

import { ReactComponent as CancelamentoIcon } from '../../../../public/assets/images/cancelamento-gratis-agger.svg';
import { ReactComponent as PagamentoIcon } from '../../../../public/assets/images/primeiro-pagamento-para-30-dias-agger.svg';
import { ReactComponent as FidelidadeIcon } from '../../../../public/assets/images/sem-fidelidade-agger.svg';
import type { TextContent } from '../../../types/aggerTypes';
import { EditableTypography } from '../../GenericEditableContent/EditableTypography';
import { FORM_MODAL_SVG_TYPES } from '../FormModalType';

interface Props {
  description: TextContent;
}

const SVGMap = {
  [FORM_MODAL_SVG_TYPES.PAGAMENTO]: PagamentoIcon,
  [FORM_MODAL_SVG_TYPES.FIDELIDADE]: FidelidadeIcon,
  [FORM_MODAL_SVG_TYPES.CANCELAMENTO]: CancelamentoIcon,
};

const EditableFormModalDescription: FC<Props> = (props) => {
  if (props.description.icon) {
    const Icon = SVGMap[props.description.icon as keyof typeof SVGMap];
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Icon
          style={{
            width: '70px',
            minWidth: '70px',
            height: '60px',
            minHeight: '60px',
          }}
        />
        <EditableTypography text={props.description} />
      </Stack>
    );
  }
  return <EditableTypography text={props.description} />;
};

export default EditableFormModalDescription;
