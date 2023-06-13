import { FC, useState, memo } from "react";
import { TextField, Button, Stack } from "@mui/material";
import AggerColorPicker from "./AggerColorPicker";
import { createStyledAggerTheme } from "../../../utils/Utility";

const styled = createStyledAggerTheme();

const ColorPickerText = styled(TextField)(({ theme }) => ({
    "& input": {
        top: "6px",
        position: "relative",
        padding: "8px 0",
        paddingBottom: "12px",
    },
    "& .MuiInputLabel-root": {
        color: theme.palette.text.primary,
    },
}));

const ColorPickerButton = styled(Button)(({ theme }) => ({
    width: "25px",
    minWidth: "25px",
    height: "25px",
    padding: "0",
    margin: "0",
    marginTop: "8px",
    marginRight: "5px",
    outline: "1px solid black",
}));

interface Props {
    color: string | undefined;
    onColorChange: (newColor: string) => void;
    label?: string;
}

const ColorPickerField: FC<Props> = (props) => {
    const [showColorPicker, setShowColorPicker] = useState(false);

    const handleShowColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };

    const handleColorPickerTextChange = (e: any) => {
        props.onColorChange(e.target.value);
    };

    return (
        <Stack width={1} spacing={1}>
            <ColorPickerText
                fullWidth
                label={props.label ? props.label : "Cor"}
                size="small"
                value={props.color}
                onChange={handleColorPickerTextChange}
                InputProps={{
                    startAdornment: (
                        <ColorPickerButton
                            sx={{
                                backgroundColor: props.color,
                                "&:hover": {
                                    backgroundColor: props.color,
                                    filter: "brightness(0.8)",
                                },
                            }}
                            onClick={handleShowColorPicker}
                        />
                    ),
                }}
            ></ColorPickerText>
            <AggerColorPicker
                show={showColorPicker}
                color={props.color as string}
                onColorChange={props.onColorChange}
                style={{ width: "100%", maxWidth: "250px", zIndex: 2 }}
            />
        </Stack>
    );
};

export default memo(ColorPickerField);
