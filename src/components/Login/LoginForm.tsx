import React, { FC, useState, useEffect } from "react";
import { Box, Button, Modal, Stack, CircularProgress } from "@mui/material";
import CenterModalBox from "../Modal/CenterModalBox";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikTextField from "../FormikTextField/FormikTextField";
import LogoAlternativo from "../../images/logo-alternativo-agger.webp";
import { createStyledAggerTheme, backendHttp } from "../../utils/Utility";
import { useAuthContext } from "./AuthContext";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface Props {}

interface LoginValues {
    email: string;
    password: string;
    name?: string;
}

const styled = createStyledAggerTheme();

const StyledCenterModalBox = styled(CenterModalBox)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4),
}));

const StyledFormikTextField = styled(FormikTextField)(({ theme }) => ({
    color: "white",
    "& .MuiInputBase-input": {
        color: "white",
    },
    "& .MuiInputBase-root": {
        padding: "6px",
    },
    "& .MuiInputLabel-root": {
        top: "5px",
    },
    "& .MuiInputLabel-shrink, .MuiInputLabel-root.Mui-focused": {
        color: "white",
        top: 0,
    },
    "& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
        {
            borderColor: "white",
        },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.highlight.main,
    "&:hover": {
        backgroundColor: "#e1aa25",
    },
    "&:disabled": {
        backgroundColor: "#fbbb2173",
    },
}));

const LoginForm: FC<Props> = (props) => {
    const { logedIn, login } = useAuthContext();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const initialValues: LoginValues = {
        email: "",
        password: "",
    };
    const formValidade = Yup.object().shape({
        email: Yup.string().email("Email invalido").required("Obrigatório"),
        password: Yup.string().required("Obrigatório"),
    });

    const onSubmit = async (values: LoginValues) => {
        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }

        const token = await executeRecaptcha("formulario_contratacao");
        let passedScore = false;
        try {
            const captchaResponse = await backendHttp.post("/google/recaptcha", { token });
            passedScore = captchaResponse.data;
        } catch (e) {
            passedScore = false;
        }

        if (passedScore) {
            try {
                setLoading(true);
                const res = await backendHttp.post(`/auth`, values);
                if (res.status === 200) {
                    login(res.data.token);
                }
            } catch (e) {
                console.log("ERROR LOGIN");
            }
        }

        setLoading(false);
    };

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (window.location.pathname === "/login" && !logedIn) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [logedIn]);

    return (
        <Modal
            open={show}
            onClose={() => setShow(false)}
            aria-labelledby="modal-modal-login"
            aria-describedby="modal-modal-login"
            disableScrollLock={true}
        >
            <StyledCenterModalBox>
                <Formik
                    initialValues={initialValues}
                    validationSchema={formValidade}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <Stack spacing={4} justifyContent="center" alignItems="center">
                            <img src={LogoAlternativo} width={150} alt="Aegger logo" />
                            <StyledFormikTextField
                                size="small"
                                label="Email"
                                name="email"
                                fullWidth
                                variant="outlined"
                                type="email"
                            />
                            <StyledFormikTextField
                                size="small"
                                label="Senha"
                                name="password"
                                fullWidth
                                variant="outlined"
                                type="password"
                            />
                            <Box position="relative">
                                <StyledButton type="submit" disabled={loading} variant="contained">
                                    Login
                                </StyledButton>
                                {loading && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: "primary",
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            marginTop: "-12px",
                                            marginLeft: "-12px",
                                        }}
                                    />
                                )}
                            </Box>
                        </Stack>
                    </Form>
                </Formik>
            </StyledCenterModalBox>
        </Modal>
    );
};

export default LoginForm;
