import { Col, Typography, useDrawer } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import EditProfileFormFields from "module/user/component/input/EditProfileFormFields/EditProfileFormFields";
import EditProfileDrawer from "../EditProfileDrawer";
import { EditProfileDrawerBodyRoot } from "./EditProfileDrawerBody.styles";

const EditProfileDrawerBody = (): JSX.Element => {
    const t = useTranslate();
    const { hideDrawer } = useDrawer();

    return (
        <EditProfileDrawerBodyRoot>
            <Typography variant="h3" fontWeight={800} css={{ overflow: "unset" }}>
                {t("editProfile")}
            </Typography>
            <Col flex={1} gap="1rem">
                <EditProfileFormFields />
                <Button variant="secondary" onClick={() => hideDrawer(EditProfileDrawer.id)}>
                    {t("cancel")}
                </Button>
            </Col>
        </EditProfileDrawerBodyRoot>
    );
};

export default EditProfileDrawerBody;
