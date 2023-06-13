import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Toolbar } from '@mui/material';
import type { FC, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';

import type { OnPropChangeParameters } from '../../utils/Utility';
import {
  createStyledAggerTheme,
  handleEditableContentChange,
} from '../../utils/Utility';
import EditionAccordion from '../Sidebar/EditionAccordion';
import EditionTabs from '../Sidebar/EditionTabs/EditionTabs';
import { useDepoimentoContentContext } from './DepoimentoContext';
import type {
  DepoimentosContent,
  DepoimentosEditableContent,
} from './DepoimentosType';

const styled = createStyledAggerTheme();

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  transition: 'all ease 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
})) as typeof IconButton;

const DepoimentoEdition: FC = () => {
  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(
    false
  );

  const handleAccordionChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpanded(isExpanded ? panel : false);
    };

  const {
    depoimentoContent,
    updateDepoimentoContent,
    addDepoimento,
    deleteDepoimento,
  } = useDepoimentoContentContext();

  const deleteDepoimentoById = (e: any, index: number) => {
    e.stopPropagation();
    deleteDepoimento(index);
  };

  const onPropChange = useCallback(
    (
      arg0: OnPropChangeParameters<
        DepoimentosContent,
        DepoimentosEditableContent
      >
    ) => {
      handleEditableContentChange({
        ...arg0,
        oldProps: depoimentoContent,
        update: updateDepoimentoContent,
      });
    },
    []
  );

  return (
    <>
      {depoimentoContent.texts.map((depoimentoText, index) => {
        return (
          <EditionAccordion
            key={depoimentoText.key}
            identification={depoimentoText.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <EditionTabs
              tabs={depoimentoText}
              contentName="texts"
              contentIndex={index}
              onPropChange={onPropChange}
            />
          </EditionAccordion>
        );
      })}
      {depoimentoContent.depoimentos.map((depoimento, index) => {
        return (
          <EditionAccordion
            key={depoimento.key}
            identification={depoimento.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
            icons={[
              // eslint-disable-next-line react/no-array-index-key
              <StyledIconButton key={depoimento.key + index}>
                <DeleteIcon
                  onClick={(e) => {
                    deleteDepoimentoById(e, index);
                  }}
                />
              </StyledIconButton>,
            ]}
          >
            <EditionTabs
              tabs={{
                name: depoimento.name,
                profession: depoimento.profession,
                deposition: depoimento.deposition,
              }}
              contentName="depoimentos"
              contentIndex={index}
              onPropChange={onPropChange}
            />
          </EditionAccordion>
        );
      })}
      <Toolbar sx={{ justifyContent: 'center' }}>
        <StyledIconButton onClick={addDepoimento}>
          <AddIcon />
        </StyledIconButton>
      </Toolbar>
    </>
  );
};

export default DepoimentoEdition;
