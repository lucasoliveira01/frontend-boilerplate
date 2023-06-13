import React, { FC, useState, memo } from "react";
import { MenuItem, InputLabel, FormControl } from "@mui/material";
import { createStyledAggerTheme } from "../../../utils/Utility";
import AggerTheme from "../../../utils/AggerTheme";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
    fontFamily: string;
    onChange: (fontFamily: string) => void;
}

const styled = createStyledAggerTheme();

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    color: theme.palette.text.primary,
}));

const FontFamilyPicker: FC<Props> = (props) => {
    const [value, setValue] = useState(props.fontFamily);

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        setValue(event.target.value as string);
        props.onChange(event.target.value as string);
    };

    const fonts = AggerTheme.typography.fontFamily?.split(",");

    return (
        <FormControl>
            <StyledInputLabel id="font_label">Fonte</StyledInputLabel>
            <Select
                value={value}
                onChange={handleChange}
                size="small"
                variant="outlined"
                label="Fonte"
                labelId="font_label"
                sx={{ minWidth: "100px" }}
                MenuProps={{
                    MenuListProps: { disablePadding: true },
                    disableScrollLock: true,
                }}
            >
                {fonts?.map((font, index) => {
                    return (
                        <MenuItem key={index} value={font}>
                            {font}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default memo(FontFamilyPicker);
