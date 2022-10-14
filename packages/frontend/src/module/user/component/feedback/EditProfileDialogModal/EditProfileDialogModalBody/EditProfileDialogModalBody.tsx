import { Col, Typography, useModal } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import EditProfileFieldsForm from "module/user/component/input/EditProfileFieldsForm/EditProfileFieldsForm";
import EditProfileDialogModal from "../EditProfileDialogModal";
import { EditProfileDialogModalBodyRoot } from "./EditProfileDialogModalBody.styles";

const EditProfileDialogModalBody = (): JSX.Element => {
    const t = useTranslate();
    const { hideModal } = useModal();
    return (
        <EditProfileDialogModalBodyRoot>
            <Typography variant="h3" fontWeight={800}>
                {t("editProfile")}
            </Typography>
            <Col flex={1} gap="1rem">
                <EditProfileFieldsForm />
                <Button variant="secondary" onClick={() => hideModal(EditProfileDialogModal)}>
                    {t("cancel")}
                </Button>
            </Col>
        </EditProfileDialogModalBodyRoot>
    );
};

export default EditProfileDialogModalBody;
