import { Box, BoxProps } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { createStyledAggerTheme } from "../../../utils/Utility";

const styled = createStyledAggerTheme();

interface Props extends BoxProps {
    children?: ReactNode;
    tabActive: number;
    index: number;
}

const TabPanel: FC<Props> = (props) => {
    if (props.tabActive === props.index) {
        return <Box>{props.children}</Box>;
    } else {
        return <></>;
    }
};

export default TabPanel;
