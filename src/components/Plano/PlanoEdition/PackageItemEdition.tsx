import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, List, ListItem, ListItemText, Stack } from '@mui/material';
import type { FC } from 'react';
import { useState } from 'react';

import { getHtmlInnerText } from '../../../utils/Utility';
import type { PlanoEditablePlan } from '../PlanoType';

interface OnPackageItemChangeParameters {
  editorData: string;
  planoIndex: number;
  type: string;
  subIndex: number;
}

interface PackagesProps {
  planoItem: PlanoEditablePlan;
  planoIndex: number;
  onPackageItemChange: (arg0: OnPackageItemChangeParameters) => void;
}

const PackageItemEdition: FC<PackagesProps> = (props) => {
  const [packgeItemEditing, setPackgeItemEditing] = useState<
    number | undefined
  >();

  const { planoItem } = props;
  const { planoIndex } = props;

  return (
    <List dense>
      {planoItem.packageItems.map((item, packageIndex) => (
        <>
          <ListItem
            key={item.key}
            sx={{ paddingRight: '96px' }}
            secondaryAction={
              <Stack direction="row" spacing={2}>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => {
                    if (packgeItemEditing === packageIndex) {
                      setPackgeItemEditing(undefined);
                    } else {
                      setPackgeItemEditing(packageIndex);
                    }
                  }}
                >
                  {packgeItemEditing === packageIndex && <CheckIcon />}
                  {packgeItemEditing !== packageIndex && <EditIcon />}
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    props.onPackageItemChange({
                      editorData: 'removePackageItem',
                      planoIndex,
                      type: 'packageItems',
                      subIndex: packageIndex,
                    });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            }
          >
            <ListItemText>{getHtmlInnerText(item.text)}</ListItemText>
          </ListItem>
          {packgeItemEditing === packageIndex && (
            <ListItem>
              {/* <CKEditor
                data={item.text}
                onChange={(editorData) => {
                  props.onPackageItemChange({
                    editorData,
                    planoIndex,
                    type: 'packageItems',
                    subIndex: packageIndex,
                  });
                }}
              /> */}
            </ListItem>
          )}
        </>
      ))}
      <ListItem>
        <ListItemText sx={{ textAlign: 'center' }}>
          <IconButton
            edge="end"
            aria-label="add"
            onClick={() => {
              props.onPackageItemChange({
                editorData: 'Novo Item',
                planoIndex,
                type: 'packageItems',
                subIndex: planoItem.packageItems.length,
              });
            }}
          >
            <AddIcon />
          </IconButton>
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default PackageItemEdition;
