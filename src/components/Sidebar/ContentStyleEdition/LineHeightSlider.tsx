import React, { FC, useState, memo } from "react";
import { Slider, Input, Stack, Typography } from "@mui/material";
import { createStyledAggerTheme } from "../../../utils/Utility";
import AggerTheme from "../../../utils/AggerTheme";

interface Props {
    lineHeight: string | number | undefined;
    onChange: (lineHeight: string | number | undefined) => void;
}

const styled = createStyledAggerTheme();

const StyledSlider = styled(Slider)(({ theme }) => ({
    "& .MuiSlider-valueLabelOpen": {
        backgroundColor: theme.palette.primary.main,
        boxShadow: "1px 1px 4px 0px #0000006b",
    },
    "& .MuiSlider-valueLabelLabel": {
        color: "white",
    },
    "& .MuiSlider-markLabel": {
        color: theme.palette.primary.main,
    },
}));

const StyledInput = styled(Input)(({ theme }) => ({
    width: "55px",
    height: "30px",
    color: theme.palette.primary.main,
}));

const LineHeightSlider: FC<Props> = (props) => {
    const marks = [
        {
            value: AggerTheme.typography.h1.lineHeight as number,
            label: "h1",
        },
        {
            value: AggerTheme.typography.h5.lineHeight as number,
            label: "h5",
        },
        {
            value: AggerTheme.typography.h6.lineHeight as number,
            label: "h6",
        },
        {
            value: AggerTheme.typography.body1.lineHeight as number,
            label: "p",
        },
    ];

    const [value, setValue] = useState<number>(
        typeof props.lineHeight === "number" ? props.lineHeight : 0
    );

    const handleChange = (e: Event, newValue: number | number[]) => {
        if (typeof newValue === "number") {
            setValue(newValue);
            props.onChange(newValue);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value === "" ? 0 : Number(event.target.value);

        handleChange(event as any, inputValue < 0 ? 0 : inputValue > 4.5 ? 4.5 : inputValue);
    };

    return (
        <Stack spacing={0}>
            <Typography>Espaçamento das linhas</Typography>
            <Stack direction="row" spacing={1}>
                <StyledSlider
                    value={value}
                    min={0}
                    step={0.01}
                    max={2.5}
                    marks={marks}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                />
                <StyledInput
                    value={value as number}
                    size="small"
                    type="number"
                    onChange={handleInputChange}
                    inputProps={{
                        step: 0.01,
                        min: 0,
                        max: 2.5,
                        type: "number",
                        "aria-labelledby": "input-slider",
                    }}
                />
            </Stack>
        </Stack>
    );
};

export default memo(LineHeightSlider);
