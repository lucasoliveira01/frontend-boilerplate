import type { Theme } from '@mui/material';
import { Skeleton } from '@mui/material';
import type { LinkProps } from '@mui/material/Link';
import Link from '@mui/material/Link';
import type { SxProps } from '@mui/system';
import parse from 'html-react-parser';
import type { FC, MouseEvent, ReactElement } from 'react';

import type { TextContent } from '../../types/aggerTypes';
import { createStyledAggerTheme, scrollTo } from '../../utils/Utility';

interface EditableLinkProps extends LinkProps {
  link: TextContent;
}

const styled = createStyledAggerTheme();

const StyledLink = styled(Link)(() => ({
  '& p': {
    padding: 0,
    margin: 0,
  },
}));

export const EditableLink: FC<EditableLinkProps> = (props): ReactElement => {
  const { link } = props;
  const variant = link.htmlTag as any;

  const sxStyle: SxProps<Theme> = [
    ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ...(Array.isArray(link.style) ? link.style : [link.style]),
  ];

  const handleOnClick = (
    e:
      | MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
      | MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => {
    if (link.href?.indexOf('#') === 0) {
      scrollTo(link.href);
    }

    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <StyledLink
      className="editable"
      {...props}
      id={link.googleTagManagerID ? link.googleTagManagerID : props.id}
      underline="none"
      href={link.href?.indexOf('#') === 0 ? undefined : link.href}
      onClick={handleOnClick}
      sx={sxStyle}
      variant={variant}
    >
      {link.text === '' && <Skeleton />}
      {link.text !== '' && parse(link.text)}
    </StyledLink>
  );
};

export default EditableLink;
