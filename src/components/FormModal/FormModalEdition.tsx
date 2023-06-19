import type { FC, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';

import type { OnPropChangeParameters } from '../../utils/Utility';
import { handleEditableContentChange } from '../../utils/Utility';
import EditionAccordion from '../Sidebar/EditionAccordion';
import EditionTabs from '../Sidebar/EditionTabs/EditionTabs';
import { useFormModalContentContext } from './FormModalContext';
import type {
  FormModalContent,
  FormModalEditableContent,
} from './FormModalType';

interface Props {}

const FormModalEdition: FC<Props> = () => {
  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(
    false
  );

  const handleAccordionChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpanded(isExpanded ? panel : false);
    };

  const { formModalContent, updateFormModal } = useFormModalContentContext();

  const onPropChange = useCallback(
    (
      arg0: OnPropChangeParameters<FormModalContent, FormModalEditableContent>
    ) => {
      handleEditableContentChange({
        ...arg0,
        oldProps: formModalContent,
        update: updateFormModal,
      });
    },
    []
  );

  return (
    <>
      {formModalContent.forms.map((form, index) => {
        return (
          <EditionAccordion
            key={index}
            identification={form.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <EditionTabs
              tabs={{
                title: form.title,
                submitButton: form.submitButton,
              }}
              contentName="forms"
              contentIndex={index}
              onPropChange={onPropChange}
            />
          </EditionAccordion>
        );
      })}
      {formModalContent.popUps.map((contrateFormPopUp, index) => {
        return (
          <EditionAccordion
            key={index}
            identification={contrateFormPopUp.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <EditionTabs
              tabs={{
                title: contrateFormPopUp.title,
                content: contrateFormPopUp.content,
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

export default FormModalEdition;
