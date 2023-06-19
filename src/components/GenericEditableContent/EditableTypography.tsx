import type { Theme } from '@mui/material';
import { Skeleton } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/system';
import parse from 'html-react-parser';
import type { ElementType, FC, ReactElement } from 'react';

import type { TextContent } from '../../types/aggerTypes';
import { HTML_TEXT_TAGS } from '../../types/aggerTypes';
import { createStyledAggerTheme } from '../../utils/Utility';

const styled = createStyledAggerTheme();

interface Component {
  component?: string | ElementType;
}

const StyledTypography = styled(Typography)<Component>(() => ({
  cursor: 'default',
  whiteSpace: 'inherit',
  wordBreak: 'break-word',
  '& p': {
    padding: 0,
    margin: 0,
    fontFamily: 'inherit',
  },
  '& span': {
    display: 'block',
  },
  '& ul': {
    padding: '0 18px',
  },
}));

interface EditableTextProps extends TypographyProps {
  text: TextContent;
}

export const EditableTypography: FC<EditableTextProps> = (
  props
): ReactElement => {
  const { text } = props;
  const variant = text.htmlTag;
  const sxStyle: SxProps<Theme> = [
    ...(Array.isArray(text.style) ? text.style : [text.style]),
    ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
  ];

  return (
    <StyledTypography
      className="editable"
      {...props}
      sx={sxStyle}
      variant={variant}
      component={variant === HTML_TEXT_TAGS.P ? 'div' : variant}
    >
      {text.text === '' && <Skeleton />}
      {text.text !== '' && parse(text.text)}
    </StyledTypography>
  );
};

export default EditableTypography;
