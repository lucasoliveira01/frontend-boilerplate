import type { FC, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';

import type { EditableSubContentKeysType } from '../../types/aggerTypes';
import type { OnPropChangeParameters } from '../../utils/Utility';
import { handleEditableContentChange } from '../../utils/Utility';
import EditionAccordion from '../Sidebar/EditionAccordion';
import EditionTabs from '../Sidebar/EditionTabs/EditionTabs';
import { useSobreNosContentContext } from './SobreNosContentContext';
import type { SobreNosContent, SobreNosEditableContent } from './SobreNosType';

interface Props {}

const SobreNosEdition: FC<Props> = () => {
  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(
    false
  );

  const handleAccordionChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpanded(isExpanded ? panel : false);
    };

  const { sobreNosContent, updateSobreNosContent } =
    useSobreNosContentContext();

  const onPropChange = useCallback(
    (
      arg0: OnPropChangeParameters<SobreNosContent, SobreNosEditableContent>
    ) => {
      handleEditableContentChange({
        ...arg0,
        oldProps: sobreNosContent,
        update: updateSobreNosContent,
      });
    },
    []
  );

  return (
    <>
      {sobreNosContent.texts.map((sobreNosItem, index) => {
        return (
          <EditionAccordion
            key={index}
            identification={sobreNosItem.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <EditionTabs
              tabs={sobreNosItem}
              contentName="texts"
              contentIndex={index}
              onPropChange={onPropChange}
            />
          </EditionAccordion>
        );
      })}
      {sobreNosContent.numbers.map((sobreNosNumero, index) => {
        return (
          <EditionAccordion
            key={index}
            identification={sobreNosNumero.key}
            identificationAlias={`Informativo ${index + 1}`}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <EditionTabs
              tabs={
                {
                  number: sobreNosNumero.number,
                  text: sobreNosNumero.text,
                } as EditableSubContentKeysType
              }
              contentName="numbers"
              contentIndex={index}
              onPropChange={onPropChange}
            />
          </EditionAccordion>
        );
      })}
    </>
  );
};

export default SobreNosEdition;
