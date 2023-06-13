import { FC, useState, memo } from "react";
import { Stack } from "@mui/material";
import { EditableCSSProperties, EDITABLE_CONTENT_CSS_MAP } from "../../../types/aggerTypes";

import FontFamilyPicker from "./FontFamilyPicker";
import TextAlignPicker from "./TextAlignPicker";
import ColorPickerField from "./ColorPickerField";
import FontSizeSlider from "./FontSizeSlider";
import LineHeightSlider from "./LineHeightSlider";

interface Props {
    styles: EditableCSSProperties;
    onStyleChange: (
        newStyle: EditableCSSProperties,
        styleChanged: EDITABLE_CONTENT_CSS_MAP
    ) => void;
}

const ContentStyleEdition: FC<Props> = (props) => {
    //FONT FAMILY
    const [fontFamily, setFontFamily] = useState(props.styles?.fontFamily || "");
    const fontFamilyChange = (fontFamily: string) => {
        props.onStyleChange(
            fontFamily as EditableCSSProperties,
            EDITABLE_CONTENT_CSS_MAP.FONT_FAMILY
        );
    };

    const handleFontFamilyChange = (fontFamily: string) => {
        setFontFamily(fontFamily);
        fontFamilyChange(fontFamily);
    };

    //TEXT ALIGN
    const [textAlign, setTextAlign] = useState(props.styles?.textAlign);
    const textAlignChange = (textAlign: string) => {
        props.onStyleChange(
            textAlign as EditableCSSProperties,
            EDITABLE_CONTENT_CSS_MAP.TEXT_ALIGN
        );
    };

    const handleTextAlignChange = (textAlign: string) => {
        setTextAlign(textAlign as EditableCSSProperties["textAlign"]);
        textAlignChange(textAlign);
    };

    //COLOR
    const [color, setColor] = useState(props.styles?.color);
    const colorChange = (newColor: string) => {
        props.onStyleChange(newColor as EditableCSSProperties, EDITABLE_CONTENT_CSS_MAP.COLOR);
    };

    const handleColorChange = (newColor: string) => {
        setColor(newColor);
        colorChange(newColor);
    };

    //BACKGROUND COLOR
    const [backgroundColor, setBackgroundColor] = useState(props.styles?.backgroundColor);
    const backgroundColorChange = (newColor: string) => {
        props.onStyleChange(
            newColor as EditableCSSProperties,
            EDITABLE_CONTENT_CSS_MAP.BACKGROUND_COLOR
        );
    };

    const handleBackgroundColorChange = (newColor: string) => {
        setBackgroundColor(newColor);
        backgroundColorChange(newColor);
    };

    //LINE HEIGHT
    const [lineHeight, setLineHeight] = useState(props.styles?.lineHeight);
    const lineHeightChange = (lineHeight: string | number | undefined) => {
        props.onStyleChange(
            lineHeight as EditableCSSProperties,
            EDITABLE_CONTENT_CSS_MAP.LINE_HEIGHT
        );
    };

    const handleLineHeightChange = (lineHeight: string | number | undefined) => {
        setLineHeight(lineHeight);
        lineHeightChange(lineHeight);
    };

    //FONT SIZE
    const [fontSize, setFontSize] = useState((props.styles?.fontSize as string) || "1rem");
    const fontSizeChange = (fontSize: string) => {
        props.onStyleChange(fontSize as EditableCSSProperties, EDITABLE_CONTENT_CSS_MAP.FONT_SIZE);
    };

    const handleFontSizeChange = (fontSize: string) => {
        setFontSize(fontSize);
        fontSizeChange(fontSize);
    };

    return (
        <Stack spacing={4}>
            <Stack direction="row" spacing={2}>
                <FontFamilyPicker fontFamily={fontFamily} onChange={handleFontFamilyChange} />
                <TextAlignPicker textAlign={textAlign as string} onChange={handleTextAlignChange} />
            </Stack>
            <ColorPickerField
                label="Cor do texto"
                color={color}
                onColorChange={handleColorChange}
            />
            <ColorPickerField
                label="Cor do fundo"
                color={backgroundColor}
                onColorChange={handleBackgroundColorChange}
            />
            <FontSizeSlider fontSize={fontSize} onChange={handleFontSizeChange} />
            <LineHeightSlider lineHeight={lineHeight} onChange={handleLineHeightChange} />
        </Stack>
    );
};

export default memo(ContentStyleEdition);
