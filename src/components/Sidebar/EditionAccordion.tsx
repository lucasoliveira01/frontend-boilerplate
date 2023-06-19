import { ExpandMore } from '@mui/icons-material';
import type { AccordionProps } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material';
import type { FC, ReactElement, SyntheticEvent } from 'react';

import { createStyledAggerTheme } from '../../utils/Utility';

const styled = createStyledAggerTheme();

const StyledAccordion = styled(Accordion)(() => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  padding: 0,
})) as typeof Accordion;

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: 0,
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})) as typeof AccordionSummary;

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  marginLeft: theme.spacing(1),
})) as typeof AccordionDetails;
interface Props extends AccordionProps {
  identificationAlias?: string;
  identification: string;
  icons?: ReactElement[];
  accordionExpanded: string | false;
  handleAccordionChange: (
    arg0: string
  ) =>
    | ((event: SyntheticEvent<Element, Event>, expanded: boolean) => void)
    | undefined;
}

const EditionAccordion: FC<Props> = (props) => {
  return (
    <StyledAccordion
      expanded={props.accordionExpanded === props.identification}
      onChange={props.handleAccordionChange(props.identification)}
      TransitionProps={{ unmountOnExit: true }}
      disableGutters
      elevation={0}
      square
    >
      <StyledAccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={props.identification}
        onClick={props.onClick}
        id={props.identification}
      >
        <Typography>
          {props.identificationAlias
            ? props.identificationAlias
            : props.identification}
        </Typography>
        <Stack spacing={1} direction="row">
          {props.icons &&
            props.icons.map((icon) => {
              return icon;
            })}
        </Stack>
      </StyledAccordionSummary>
      <StyledAccordionDetails>{props.children}</StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default EditionAccordion;
