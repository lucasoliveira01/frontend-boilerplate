import type { Theme } from '@mui/material';
import { Skeleton } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { SxProps } from '@mui/system';
import parse from 'html-react-parser';
import type { FC, ReactElement } from 'react';

import type { TextContent } from '../../types/aggerTypes';
import * as Utility from '../../utils/Utility';

interface EditableButtonProps extends ButtonProps {
  button: TextContent;
}

const styled = Utility.createStyledAggerTheme();

const StyledButton = styled(Button)(() => ({
  '& p': {
    padding: 0,
    margin: 0,
  },
}));

export const EditableButton: FC<EditableButtonProps> = (
  props
): ReactElement => {
  const { button } = props;

  const sxStyle: SxProps<Theme> = [
    ...(Array.isArray(button.style) ? button.style : [button.style]),
    ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
  ];

  return (
    <StyledButton
      className="editable"
      {...props}
      id={button.googleTagManagerID ? button.googleTagManagerID : props.id}
      variant={button.style?.backgroundColor ? 'contained' : 'outlined'}
      sx={sxStyle}
    >
      {button.text === '' && <Skeleton />}
      {button.text !== '' && parse(button.text)}
    </StyledButton>
  );
};

export default EditableButton;
