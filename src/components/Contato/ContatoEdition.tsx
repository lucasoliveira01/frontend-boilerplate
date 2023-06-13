import type { FC, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';

import type { OnPropChangeParameters } from '../../utils/Utility';
import { handleEditableContentChange } from '../../utils/Utility';
import EditionAccordion from '../Sidebar/EditionAccordion';
import EditionTabs from '../Sidebar/EditionTabs/EditionTabs';
import { useContatoContentContext } from './ContatoContentContext';
import type { ContatoContent, ContatoEditableContent } from './ContatoType';

interface Props {}

const ContatoEdition: FC<Props> = (props) => {
  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(
    false
  );

  const handleAccordionChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpanded(isExpanded ? panel : false);
    };

  const { contatoContent, updateContatoContent } = useContatoContentContext();

  const onPropChange = useCallback(
    (arg0: OnPropChangeParameters<ContatoContent, ContatoEditableContent>) => {
      handleEditableContentChange({
        ...arg0,
        oldProps: contatoContent,
        update: updateContatoContent,
      });
    },
    []
  );

  return (
    <>
      {contatoContent.texts.map((contatoItem, index) => {
        return (
          <EditionAccordion
            key={index}
            identification={contatoItem.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <EditionTabs
              tabs={contatoItem}
              contentName="texts"
              contentIndex={index}
              onPropChange={onPropChange}
            />
          </EditionAccordion>
        );
      })}
      {contatoContent.popUps.map((contatoPopup, index) => {
        return (
          <EditionAccordion
            key={index}
            identification={contatoPopup.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <EditionTabs
              tabs={{
                title: contatoPopup.title,
                content: contatoPopup.content,
                actionButton: contatoPopup.actionButton,
              }}
              contentName="popUps"
              contentIndex={index}
              onPropChange={onPropChange}
            />
          </EditionAccordion>
        );
      })}
    </>
  );
};

export default ContatoEdition;
