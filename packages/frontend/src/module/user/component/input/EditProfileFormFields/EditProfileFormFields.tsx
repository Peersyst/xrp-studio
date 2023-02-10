import { Col, Row } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import TextArea from "module/common/component/input/TextArea/TextArea";
import useTranslate from "module/common/hook/useTranslate";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import { useUpdateUser } from "module/user/query/useUpdateUser";
import { UpdateUserFields } from "../../feedback/EditProfileDrawer/EditProfileDrawer";
import EditProfileName from "../EditProfileName/EditProfileName";
import { HalfWidthTextField } from "./EditProfileFormFields.styles";
import { config } from "config";

const EditProfileFormFields = (): JSX.Element => {
    const t = useTranslate();
    const { data: user, isFetching: loadingUser } = useGetWalletUser();
    const { isLoading: updatingUser } = useUpdateUser();
    const { description, twitter, discord } = user ?? {};

    return (
        <Col flex={1} gap="2.5rem">
            <Col key={JSON.stringify(user)} flex={1} gap="1.5rem">
                <EditProfileName />
                <TextArea
                    displayLength
                    maxLength={config.maxBioChars}
                    placeholder={t("writeYour", { name: t("bio") })}
                    label={capitalize(t("bio"))}
                    name={UpdateUserFields.description}
                    defaultValue={description || ""}
                />
                <Row flex={1} justifyContent="space-between" gap="1.5rem" wrap wrapGap="1.5rem">
                    <HalfWidthTextField
                        prefix="@"
                        placeholder={t("writeYour", { name: "Discord @id" })}
                        label={"Discord"}
                        name={UpdateUserFields.discord}
                        defaultValue={discord}
                        validators={{ maxChars: config.maxDiscordUsernameChars, minChars: config.minDiscordUsernameChars }}
                    />
                    <HalfWidthTextField
                        prefix="@"
                        placeholder={t("writeYour", { name: "Twitter @id" })}
                        label={"Twitter"}
                        name={UpdateUserFields.twitter}
                        defaultValue={twitter}
                        validators={{ maxChars: config.maxTwitterUsernameChars }}
                    />
                </Row>
            </Col>
            <Button type="submit" loading={updatingUser} disabled={loadingUser}>
                {t("updateProfile")}
            </Button>
        </Col>
    );
};

export default EditProfileFormFields;
