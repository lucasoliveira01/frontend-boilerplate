import type { FC, SyntheticEvent } from 'react';
import { memo, useCallback, useState } from 'react';

import type { OnPropChangeParameters } from '../../utils/Utility';
import { handleEditableContentChange } from '../../utils/Utility';
import EditionAccordion from '../Sidebar/EditionAccordion';
import EditionTabs from '../Sidebar/EditionTabs';
import { useNavbarContentContext } from './NavbarContentContext';
import type { NavbarContent, NavbarEditableContent } from './NavbarType';

interface Props {}

const NavbarEdition: FC<Props> = () => {
  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(
    false
  );

  const handleAccordionChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpanded(isExpanded ? panel : false);
    };

  const { navbarContent, updateNavbarContent } = useNavbarContentContext();

  const onPropChange = useCallback(
    (arg0: OnPropChangeParameters<NavbarContent, NavbarEditableContent>) => {
      handleEditableContentChange({
        ...arg0,
        oldProps: navbarContent,
        update: updateNavbarContent,
      });
    },
    []
  );

  return (
    <>
      {navbarContent.texts.map((navItem, index) => {
        return (
          <EditionAccordion
            key={index}
            identification={navItem.key}
            accordionExpanded={accordionExpanded}
            handleAccordionChange={handleAccordionChange}
            sx={{ paddingBottom: '50px' }}
          >
            <EditionTabs
              tabs={navItem}
              onPropChange={onPropChange}
              contentName="texts"
              contentIndex={index}
            />
          </EditionAccordion>
        );
      })}
    </>
  );
};

export default memo(NavbarEdition);
