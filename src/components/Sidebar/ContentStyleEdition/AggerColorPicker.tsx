import { Button, Collapse, Paper, Stack } from '@mui/material';
import type { CSSProperties, FC, MouseEvent } from 'react';
import { memo } from 'react';
import { HexColorPicker } from 'react-colorful';

import AggerTheme from '../../../utils/AggerTheme';
import { createStyledAggerTheme } from '../../../utils/Utility';

const styled = createStyledAggerTheme();

const ColorPickerWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#f9f9f9',
}));

const ColorPickerButton = styled(Button)(() => ({
  width: '25px',
  minWidth: '25px',
  height: '25px',
  padding: '0',
  margin: '0',
  marginTop: '8px',
  marginRight: '5px',
  outline: '1px solid black',
  '&:hover': {
    filter: 'brightness(0.8)',
  },
}));

const ColorPickerButtonPrimaryColor = styled(ColorPickerButton)(
  ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      filter: 'brightness(0.8)',
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const ColorPickerButtonPrimaryContrastTextColor = styled(ColorPickerButton)(
  ({ theme }) => ({
    backgroundColor: theme.palette.primary.contrastText,
    '&:hover': {
      filter: 'brightness(0.8)',
      backgroundColor: theme.palette.primary.contrastText,
    },
  })
);

const ColorPickerButtonPrimaryTextColor = styled(ColorPickerButton)(
  ({ theme }) => ({
    backgroundColor: theme.palette.text.primary,
    '&:hover': {
      filter: 'brightness(0.8)',
      backgroundColor: theme.palette.text.primary,
    },
  })
);

const ColorPickerButtonSecondaryContrastTextColor = styled(ColorPickerButton)(
  ({ theme }) => ({
    backgroundColor: theme.palette.secondary.contrastText,
    '&:hover': {
      filter: 'brightness(0.8)',
      backgroundColor: theme.palette.secondary.contrastText,
    },
  })
);

const ColorPickerButtonHighlightColor = styled(ColorPickerButton)(
  ({ theme }) => ({
    backgroundColor: theme.palette.highlight.main,
    '&:hover': {
      filter: 'brightness(0.8)',
      backgroundColor: theme.palette.highlight.main,
    },
  })
);

const ColorPickerButtonLowContrastHighlightColor = styled(ColorPickerButton)(
  () => ({
    backgroundColor: '#FFD526',
    '&:hover': {
      filter: 'brightness(0.8)',
      backgroundColor: '#FFD526',
    },
  })
);

interface Props {
  show?: boolean;
  color: string;
  onColorChange: (newColor: string) => void;
  style: CSSProperties;
}

const AggerColorPicker: FC<Props> = (props) => {
  const handleColorButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    props.onColorChange(e.currentTarget.id.replaceAll('color_picker_', ''));
  };

  return (
    <Collapse in={props.show}>
      <ColorPickerWrapper elevation={2} style={props.style}>
        <Stack spacing={0}>
          <HexColorPicker color={props.color} onChange={props.onColorChange} />
          <Stack spacing={0} direction="row" justifyContent="center">
            <ColorPickerButtonPrimaryColor
              id={`color_picker_${AggerTheme.palette.primary.main}`}
              onClick={handleColorButtonClick}
            />
            <ColorPickerButtonPrimaryContrastTextColor
              id={`color_picker_${AggerTheme.palette.primary.contrastText}`}
              onClick={handleColorButtonClick}
            />
            <ColorPickerButtonPrimaryTextColor
              id={`color_picker_${AggerTheme.palette.text.primary}`}
              onClick={handleColorButtonClick}
            />
            <ColorPickerButtonSecondaryContrastTextColor
              id={`color_picker_${AggerTheme.palette.secondary.contrastText}`}
              onClick={handleColorButtonClick}
            />
            <ColorPickerButtonHighlightColor
              id={`color_picker_${AggerTheme.palette.highlight.main}`}
              onClick={handleColorButtonClick}
            />
            <ColorPickerButtonLowContrastHighlightColor
              id="color_picker_#FFD526"
              onClick={handleColorButtonClick}
            />
          </Stack>
        </Stack>
      </ColorPickerWrapper>
    </Collapse>
  );
};

export default memo(AggerColorPicker);
