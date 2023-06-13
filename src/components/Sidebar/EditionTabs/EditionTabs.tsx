import { Divider, Stack, Tab, Tabs, TextField } from '@mui/material';
import type { ReactElement } from 'react';
import React, { isValidElement, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import type {
  EDITABLE_CONTENT_CSS_MAP,
  EditableContentName,
  EditableCSSProperties,
  EditableSubContentKeysType,
  TextContent,
} from '../../../types/aggerTypes';
import { EDITABLE_TYPES } from '../../../types/aggerTypes';
import type { OnPropChangeParameters } from '../../../utils/Utility';
import {
  createStyledAggerTheme,
  isEditableDataContentType,
} from '../../../utils/Utility';
import ContentStyleEdition from '../ContentStyleEdition';
import TabPanel from './TabPanel';

const styled = createStyledAggerTheme();

const StyledTab = styled(Tab)(() => ({
  minWidth: 'fit-content',
  flex: 1,
  textTransform: 'none',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
}));

interface Props<T, K> {
  tabs: EditableSubContentKeysType | TextContent;
  customTabs?: { [key: string]: ReactElement };
  contentName: keyof T;
  contentIndex: number;
  onPropChange: (arg0: OnPropChangeParameters<T, K>) => void;
}

const EditionTabs = <T, K extends EditableContentName>(props: Props<T, K>) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };

  function a11yProps(index: number) {
    return {
      id: `edition-tab-${index}`,
      'aria-controls': `edition-tabpanel-${index}`,
    };
  }

  const debouncedPropChange = useDebouncedCallback(
    (arg0: OnPropChangeParameters<T, K>) => {
      props.onPropChange(arg0);
    },
    150
  );

  const TabContent = (tab: TextContent, subContentName?: string) => {
    // const [editorText, setEditorText] = useState(tab.text);
    const [href, setHref] = useState(tab.href);
    const [googleTagManagerID, setGoogleTagManagerID] = useState(
      tab.googleTagManagerID
    );

    // const handleTextChange = (editorData: string) => {
    //   setEditorText(editorData);
    //   debouncedPropChange({
    //     editablePropName: 'text' as K,
    //     editablePropValue: editorData,
    //     contentName: props.contentName,
    //     subContentName,
    //     contentIndex: props.contentIndex,
    //   });
    // };

    const handleStytleChange = (
      styleValue: EditableCSSProperties,
      styleChanged: EDITABLE_CONTENT_CSS_MAP
    ) => {
      const newStyle = { ...tab.style };
      if (styleValue) {
        // @ts-ignore
        newStyle[styleChanged] = styleValue;
      } else {
        delete newStyle[styleChanged];
      }

      debouncedPropChange({
        editablePropName: 'style' as K,
        editablePropValue: newStyle,
        contentName: props.contentName,
        subContentName,
        contentIndex: props.contentIndex,
      });
    };

    const handleLinkChange = (e: any) => {
      const newHref = e.target.value;
      setHref(newHref);
      debouncedPropChange({
        editablePropName: 'href' as K,
        editablePropValue: newHref,
        contentName: props.contentName,
        subContentName,
        contentIndex: props.contentIndex,
      });
    };

    const handleGoogleTagManagerID = (e: any) => {
      const newGoogleTagManagerID = e.target.value;
      setGoogleTagManagerID(newGoogleTagManagerID);
      debouncedPropChange({
        editablePropName: 'googleTagManagerID' as K,
        editablePropValue: newGoogleTagManagerID,
        contentName: props.contentName,
        subContentName,
        contentIndex: props.contentIndex,
      });
    };

    return (
      <Stack spacing={2}>
        {/* <CKEditor data={editorText} onChange={handleTextChange} /> */}
        {(tab.type === EDITABLE_TYPES.LINK ||
          (tab.type === EDITABLE_TYPES.BUTTON && tab.href)) && (
          <StyledTextField
            fullWidth
            label="Link"
            value={href}
            onChange={handleLinkChange}
          />
        )}
        {(tab.type === EDITABLE_TYPES.LINK ||
          tab.type === EDITABLE_TYPES.BUTTON) && (
          <StyledTextField
            fullWidth
            label="Google Tag Manager ID"
            value={googleTagManagerID}
            onChange={handleGoogleTagManagerID}
          />
        )}
        <Divider />
        <ContentStyleEdition
          styles={tab.style}
          onStyleChange={handleStytleChange}
        />
      </Stack>
    );
  };

  const tabKeys = Object.keys(props.tabs);
  const tabs = isEditableDataContentType(props.tabs)
    ? (props.tabs as TextContent)
    : (props.tabs as EditableSubContentKeysType);

  let customTabsKeys: string[];
  let customTabs = {};
  if (props?.customTabs) {
    customTabsKeys = Object.keys(props.customTabs);
    customTabs = props.customTabs;
  }

  const CreateTabs = () => {
    let content;
    if (isEditableDataContentType(props.tabs)) {
      content = TabContent(tabs as TextContent);
    } else {
      content = (
        <>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="secondary"
            textColor="inherit"
            aria-label="Tabs de edição"
            sx={{ my: 2 }}
          >
            {tabKeys.map((tabKey, tabKeyIndex) => {
              return (
                <StyledTab
                  key={tabKey}
                  label={(tabs[tabKey as keyof typeof tabs] as TextContent).key}
                  {...a11yProps(tabKeyIndex)}
                />
              );
            })}
            {customTabsKeys &&
              customTabsKeys.map((customTabKey, customTabKeyIndex) => {
                return (
                  <StyledTab
                    key={customTabKey}
                    label={customTabKey}
                    {...a11yProps(customTabKeyIndex + tabKeys.length)}
                  />
                );
              })}
          </Tabs>
          {tabKeys.map((tabKey, tabKeyIndex) => {
            return (
              <TabPanel key={tabKey} tabActive={activeTab} index={tabKeyIndex}>
                {TabContent(
                  tabs[tabKey as keyof typeof tabs] as TextContent,
                  tabKey
                )}
              </TabPanel>
            );
          })}
          {customTabsKeys &&
            customTabsKeys.map((customTabKey, customTabKeyIndex) => {
              return (
                <TabPanel
                  key={customTabKey}
                  tabActive={activeTab}
                  index={customTabKeyIndex + tabKeys.length}
                >
                  {isValidElement(
                    customTabs[customTabKey as keyof typeof customTabs]
                  ) && customTabs[customTabKey as keyof typeof customTabs]}
                </TabPanel>
              );
            })}
        </>
      );
    }

    return content;
  };

  return CreateTabs();
};

export default EditionTabs;
