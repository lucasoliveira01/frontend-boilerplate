import type { FC, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';

import type { OnPropChangeParameters } from '../../utils/Utility';
import { handleEditableContentChange } from '../../utils/Utility';
import EditionAccordion from '../Sidebar/EditionAccordion';
import EditionTabs from '../Sidebar/EditionTabs/EditionTabs';
import { useNossasSolucoesContentContext } from './NossasSolucoesContentContext';
import type {
  NossasSolucoesContent,
  NossasSolucoesEditableContent,
} from './NossasSolucoesType';

interface Props {}

const NossasSolucoesEdition: FC<Props> = () => {
  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(
    false
  );

  const handleAccordionChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpanded(isExpanded ? panel : false);
    };

  const { nossasSolucoesContent, updateNossasSolucoesContent } =
    useNossasSolucoesContentContext();

  const onPropChange = useCallback(
    (
      arg0: OnPropChangeParameters<
        NossasSolucoesContent,
        NossasSolucoesEditableContent
      >
    ) => {
      handleEditableContentChange({
        ...arg0,
        oldProps: nossasSolucoesContent,
        update: updateNossasSolucoesContent,
      });
    },
    []
  );

  return (
    <>
      {nossasSolucoesContent.texts.map((nossasSolucoesText, index) => {
        return (
          <EditionAccordion
            key={index}
            identification={nossasSolucoesText.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <EditionTabs
              tabs={nossasSolucoesText}
              contentName="texts"
              contentIndex={index}
              onPropChange={onPropChange}
            />
          </EditionAccordion>
        );
      })}
      {nossasSolucoesContent.solutions.map((solucao, index) => {
        return (
          <EditionAccordion
            key={index}
            identification={solucao.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <EditionTabs
              tabs={{
                title: solucao.title,
                description: solucao.description,
                knowMoreButton: solucao.knowMoreButton,
                modalTitle: solucao.modalTitle,
              }}
              contentName="solutions"
              contentIndex={index}
              onPropChange={onPropChange}
            />
          </EditionAccordion>
        );
      })}
    </>
  );
};

export default NossasSolucoesEdition;
