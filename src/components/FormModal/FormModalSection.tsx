import React, { FC } from "react";
import { Dialog, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SelectedPlanoInformation } from "../Plano/PlanoType";
import { getHtmlInnerText } from "../../utils/Utility";
import { TransitionProps } from "@mui/material/transitions";
import { useFormModalContentContext } from "./FormModalContext";
import EditableFormModal from "./EditableFormModal/EditableFormModal";
import { usePlanoContentContext } from "../Plano/PlanoContentContext";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    selectedPlanoIndexInformation: SelectedPlanoInformation;
}

const FormModalSection: FC<Props> = (props) => {
    const { formModalContent, openFormModal, hideFormModal } = useFormModalContentContext();
    const { planoContent } = usePlanoContentContext();

    const planSelectedLicence =
        planoContent.planos[props.selectedPlanoIndexInformation.planIndex].licences[
            props.selectedPlanoIndexInformation.licenceIndex
        ];
    const planPrice = parseInt(getHtmlInnerText(planSelectedLicence.price.text));

    return (
        <>
            <Dialog
                open={openFormModal}
                onClose={hideFormModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
                scroll="body"
                fullScreen
                TransitionComponent={Transition}
                sx={{ overflowX: "hidden" }}
            >
                <CloseIcon
                    sx={{ position: "fixed", top: "15px", right: "15px", cursor: "pointer" }}
                    onClick={hideFormModal}
                />
                <EditableFormModal
                    type={planPrice > 0 ? "hireAPI" : "contato"}
                    contrateFormEditableForm={
                        planPrice > 0 ? formModalContent.forms[0] : formModalContent.forms[1]
                    }
                    selectedPlanoIndexInformation={props.selectedPlanoIndexInformation}
                />
            </Dialog>
        </>
    );
};

export default FormModalSection;
