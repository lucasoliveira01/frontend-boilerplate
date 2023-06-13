import React, { FC, useState } from "react";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface Props {
    textAlign?: string;
    onChange: (textAlign: string) => void;
}

const TextAlignPicker: FC<Props> = (props) => {
    const [alignment, setAlignment] = useState(props.textAlign);

    const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        setAlignment(newAlignment);
        props.onChange(newAlignment);
    };

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            size="small"
        >
            <ToggleButton value="left" size="small" aria-label="left aligned">
                <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="center" size="small" aria-label="centered">
                <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="right" size="small" aria-label="right aligned">
                <FormatAlignRightIcon />
            </ToggleButton>
            <ToggleButton value="justify" size="small" aria-label="justified">
                <FormatAlignJustifyIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default TextAlignPicker;
