import { FC, useState } from "react";
import { IconButton, Stack, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PlanoEditablePlan } from "../PlanoType";
import { createStyledAggerTheme, getHtmlInnerText } from "../../../utils/Utility";
import NumberFormat from "react-number-format";
import FormatedTextField from "../../FormikTextField/FormatedTextField";

interface onLicenceChangeParameters {
    editorData: string;
    planoIndex: number;
    type: string;
    subIndex: number;
    licenceQuantity?: number;
    licencePrice?: string;
    licenceDescription?: string;
}

interface LicencesProps {
    planoItem: PlanoEditablePlan;
    planoIndex: number;
    onLicenceChange: (arg0: onLicenceChangeParameters) => void;
}

const styled = createStyledAggerTheme();

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputLabel-root": {
        color: theme.palette.text.primary,
    },
}));

const StyledFormatedTextField = styled(FormatedTextField)(({ theme }) => ({
    "& .MuiInputLabel-root": {
        color: theme.palette.text.primary,
    },
}));

const FormatedTextFieldAsText = styled(FormatedTextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        fontSize: "15px",
        padding: 0,
        border: "none",
        maxWidth: "60px",
        width: "auto",
        cursor: "default",
    },
    "& .MuiInputLabel-root": {
        color: theme.palette.text.primary,
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
        padding: 0,
    },
    "& .Mui-disabled": {
        "-webkitTextFillColor": theme.palette.text.primary,
    },
}));

const LicencesEdition: FC<LicencesProps> = (props) => {
    const [licenceEditing, setLicenceEditing] = useState<number | undefined>();

    const planoItem = props.planoItem;
    const planoIndex = props.planoIndex;

    return (
        <Table size="small" aria-label="licence table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Licenças</TableCell>
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="center">Preço</TableCell>
                    <TableCell align="center">Ações</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {planoItem.licences.map((licence, licenceIndex) => (
                    <>
                        <TableRow key={licence.key}>
                            <TableCell align="center">{licence.licenceQuantity}</TableCell>
                            <TableCell align="center">{licence.description}</TableCell>
                            <TableCell align="center">
                                <FormatedTextFieldAsText
                                    disabled
                                    size="small"
                                    name="price"
                                    fullWidth
                                    variant="outlined"
                                    formated="BrazilMoney"
                                    value={getHtmlInnerText(licence.price.text)}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Stack direction="row" spacing={0} justifyContent="center">
                                    <IconButton
                                        onClick={() => {
                                            if (licenceEditing === licenceIndex) {
                                                setLicenceEditing(undefined);
                                            } else {
                                                setLicenceEditing(licenceIndex);
                                            }
                                        }}
                                    >
                                        {licenceEditing !== licenceIndex && <EditIcon />}
                                        {licenceEditing === licenceIndex && <CheckIcon />}
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            props.onLicenceChange({
                                                editorData: "removeLicence",
                                                planoIndex,
                                                type: "licences",
                                                subIndex: licenceIndex,
                                            });
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>

                        {licenceEditing === licenceIndex && (
                            <TableCell colSpan={4}>
                                <Stack spacing={2} sx={{ padding: "25px 0" }}>
                                    <StyledTextField
                                        fullWidth
                                        label="Licenças"
                                        size="small"
                                        type="number"
                                        value={licence.licenceQuantity}
                                        onChange={(e) =>
                                            props.onLicenceChange({
                                                editorData: "",
                                                type: "licences",
                                                planoIndex,
                                                subIndex: licenceIndex,
                                                licenceQuantity: parseInt(e.target.value),
                                            })
                                        }
                                    />
                                    <StyledTextField
                                        fullWidth
                                        label="Descrição"
                                        size="small"
                                        value={licence.description}
                                        onChange={(e) =>
                                            props.onLicenceChange({
                                                editorData: "",
                                                type: "licences",
                                                planoIndex,
                                                subIndex: licenceIndex,
                                                licenceDescription: e.target.value,
                                            })
                                        }
                                    />
                                    <StyledFormatedTextField
                                        size="small"
                                        label="Preço"
                                        name="price"
                                        fullWidth
                                        variant="outlined"
                                        formated="BrazilMoney"
                                        value={getHtmlInnerText(licence.price.text)}
                                        onChange={(e) => {
                                            props.onLicenceChange({
                                                editorData: "",
                                                type: "licences",
                                                planoIndex,
                                                subIndex: licenceIndex,
                                                licencePrice: e.target.value.replace(".", ","),
                                            });
                                        }}
                                    />
                                </Stack>
                            </TableCell>
                        )}
                    </>
                ))}
                <TableRow>
                    <TableCell align="center" colSpan={4} sx={{ border: "none" }}>
                        <IconButton
                            onClick={() =>
                                props.onLicenceChange({
                                    editorData: "Nova Licença",
                                    planoIndex,
                                    type: "licences",
                                    subIndex: planoItem.licences.length,
                                })
                            }
                        >
                            <AddIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default LicencesEdition;
