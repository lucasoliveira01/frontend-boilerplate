import type { FC, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import type { OnPropChangeParameters } from '../../../utils/Utility';
import { handleEditableContentChange } from '../../../utils/Utility';
import EditionAccordion from '../../Sidebar/EditionAccordion';
import EditionTabs from '../../Sidebar/EditionTabs/EditionTabs';
import { usePlanoContentContext } from '../PlanoContentContext';
import type { PlanoContent, PlanoEditableContent } from '../PlanoType';
import LicencesEdition from './LicenceEdition';
import PackageItemEdition from './PackageItemEdition';

interface Props {}

const PlanoEdition: FC<Props> = () => {
  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(
    false
  );

  const handleAccordionChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpanded(isExpanded ? panel : false);
    };

  const {
    planoContent,
    updatePlanoContent,
    addPackageItem,
    deletePackageItem,
    addLicence,
    deleteLicence,
  } = usePlanoContentContext();
  interface PlanoChangeParameter {
    editorData: string;
    planoIndex: number;
    type: string;
    subIndex?: number;
    licenceQuantity?: number;
    licencePrice?: string;
    licenceDescription?: string;
  }

  const handleOnChangePlanoDebouced = useDebouncedCallback(
    ({
      editorData,
      planoIndex,
      type,
      subIndex,
      licenceQuantity,
      licencePrice,
      licenceDescription,
    }: PlanoChangeParameter) => {
      const newProp = { ...planoContent };

      if (type === 'packageItems' && typeof subIndex === 'number') {
        // ADD
        if (subIndex === newProp.planos![planoIndex]!.packageItems.length) {
          addPackageItem(planoIndex);
        }
        // DELETE
        else if (editorData === 'removePackageItem') {
          deletePackageItem(planoIndex, subIndex);
        }
        // PATCH
        else {
          newProp.planos[planoIndex]!.packageItems[subIndex]!.text = editorData;
        }
      } else if (type === 'licences' && typeof subIndex === 'number') {
        // ADD
        if (subIndex === newProp.planos![planoIndex]!.licences.length) {
          addLicence(planoIndex);
        }
        // DELETE
        else if (editorData === 'removeLicence') {
          deleteLicence(planoIndex, subIndex);
        }
        // PATCH
        else {
          if (licenceDescription) {
            newProp.planos[planoIndex]!.licences[subIndex]!.description =
              licenceDescription;
          }

          if (licenceQuantity) {
            newProp.planos[planoIndex]!.licences[subIndex]!.licenceQuantity =
              licenceQuantity;
          }

          if (licencePrice) {
            newProp.planos![planoIndex]!.licences[subIndex]!.price.text =
              licencePrice;
          }
        }
      }

      updatePlanoContent(newProp);
    },
    150
  );

  const onPropChange = useCallback(
    (arg0: OnPropChangeParameters<PlanoContent, PlanoEditableContent>) => {
      handleEditableContentChange({
        ...arg0,
        oldProps: planoContent,
        update: updatePlanoContent,
      });
    },
    []
  );

  return (
    <>
      {planoContent.texts.map((planoItem, index) => {
        return (
          <EditionAccordion
            key={index}
            identification={planoItem.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <EditionTabs
              tabs={planoItem}
              contentName="texts"
              contentIndex={index}
              onPropChange={onPropChange}
            />
          </EditionAccordion>
        );
      })}
      {planoContent.planos.map((plano, index) => {
        return (
          <EditionAccordion
            key={index}
            identification={plano.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
          >
            <EditionTabs
              tabs={{
                title: plano.title,
                description: plano.description,
                buyButton: plano.buyButton,
                requestContactButton: plano.requestContactButton,
              }}
              customTabs={{
                'Itens no pacote': (
                  <PackageItemEdition
                    planoItem={plano}
                    planoIndex={index}
                    onPackageItemChange={({
                      editorData,
                      planoIndex,
                      type,
                      subIndex,
                    }) =>
                      handleOnChangePlanoDebouced({
                        editorData,
                        planoIndex,
                        type,
                        subIndex,
                      })
                    }
                  />
                ),
                Licenças: (
                  <LicencesEdition
                    planoItem={plano}
                    planoIndex={index}
                    onLicenceChange={({
                      editorData,
                      planoIndex,
                      type,
                      subIndex,
                      licenceQuantity,
                      licencePrice,
                      licenceDescription,
                    }) =>
                      handleOnChangePlanoDebouced({
                        editorData,
                        planoIndex,
                        type,
                        subIndex,
                        licenceQuantity,
                        licencePrice,
                        licenceDescription,
                      })
                    }
                  />
                ),
              }}
              contentName="planos"
              contentIndex={index}
              onPropChange={onPropChange}
            />
          </EditionAccordion>
        );
      })}
    </>
  );
};

export default PlanoEdition;
