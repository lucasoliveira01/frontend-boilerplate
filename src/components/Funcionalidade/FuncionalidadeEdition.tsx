import type { FC, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';

import type { OnPropChangeParameters } from '../../utils/Utility';
import { handleEditableContentChange } from '../../utils/Utility';
import EditionAccordion from '../Sidebar/EditionAccordion';
import EditionTabs from '../Sidebar/EditionTabs/EditionTabs';
import { useFuncionalidadeContentContext } from './FuncionalidadeContentContext';
import type {
  FuncionalidadeContent,
  FuncionalidadeEditableContent,
} from './FuncionalidadeType';

interface Props {}

const FuncionalidadeEdition: FC<Props> = () => {
  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(
    false
  );

  const handleAccordionChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpanded(isExpanded ? panel : false);
    };

  const { funcionalidadeContent, updateFuncionalidadeContent } =
    useFuncionalidadeContentContext();

  const onPropChange = useCallback(
    (
      arg0: OnPropChangeParameters<
        FuncionalidadeContent,
        FuncionalidadeEditableContent
      >
    ) => {
      handleEditableContentChange({
        ...arg0,
        oldProps: funcionalidadeContent,
        update: updateFuncionalidadeContent,
      });
    },
    []
  );

  return (
    <>
      {funcionalidadeContent.texts.map((funcionalidadeItem, index) => {
        return (
          <EditionAccordion
            key={index}
            identification={funcionalidadeItem.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <EditionTabs
              tabs={funcionalidadeItem}
              contentName="texts"
              contentIndex={index}
              onPropChange={onPropChange}
            />
          </EditionAccordion>
        );
      })}
      {funcionalidadeContent.funcionalidades.map((funcionalidade, index) => {
        return (
          <EditionAccordion
            key={index}
            identification={funcionalidade.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <EditionTabs
              tabs={{
                title: funcionalidade.title,
                description: funcionalidade.description,
                popUpButton: funcionalidade.popUpButton,
                knowMoreLink: funcionalidade.knowMoreLink,
              }}
              contentName="funcionalidades"
              contentIndex={index}
              onPropChange={onPropChange}
            />
          </EditionAccordion>
        );
      })}
    </>
  );
};

export default FuncionalidadeEdition;
