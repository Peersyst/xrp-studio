import { Col, Row } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import TextArea from "module/common/component/input/TextArea/TextArea";
import useTranslate from "module/common/hook/useTranslate";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import { useUpdateUser } from "module/user/query/useUpdateUser";
import { useState } from "react";
import { userEditNames } from "../../feedback/EditProfileDrawer/EditProfileDrawer";
import EditProfileName from "../EditProfileName/EditProfileName";
import { EditProfileFieldsFormRoot, HalfWidthTextField } from "./EditProfileFormFields.styles";
import { config } from "config";

const EditProfileFormFields = (): JSX.Element => {
    const t = useTranslate();
    const { data: user, isFetching } = useGetWalletUser();
    const { isLoading } = useUpdateUser();
    const { description, twitter, discord } = user ?? {};
    const [validating, setValidating] = useState(false);
    const maxBioChars = config.maxBioChars;

    return (
        <EditProfileFieldsFormRoot flex={1}>
            <Col flex={1} gap="1.5rem">
                <EditProfileName setValidating={setValidating} />
                <TextArea
                    displayLength
                    maxLength={maxBioChars}
                    validators={{ maxChars: maxBioChars }}
                    placeholder={t("writeYour", { name: t("bio") })}
                    label={capitalize(t("bio"))}
                    name={userEditNames.description}
                    defaultValue={description}
                />
                <Row wrap wrapGap="1.5rem" css={{ width: "100%" }} justifyContent="space-between" gap="1.5rem">
                    <HalfWidthTextField
                        prefix="@"
                        placeholder={t("writeYour", { name: "Discord @id" })}
                        label={"Discord"}
                        name={userEditNames.discord}
                        defaultValue={discord}
                    />
                    <HalfWidthTextField
                        prefix="@"
                        placeholder={t("writeYour", { name: "Twitter @id" })}
                        label={"Twitter"}
                        name={userEditNames.twitter}
                        defaultValue={twitter}
                    />
                </Row>
            </Col>
            <Button disabled={validating} type="submit" loading={isLoading || isFetching}>
                {t("updateProfile")}
            </Button>
        </EditProfileFieldsFormRoot>
    );
};

export default EditProfileFormFields;
