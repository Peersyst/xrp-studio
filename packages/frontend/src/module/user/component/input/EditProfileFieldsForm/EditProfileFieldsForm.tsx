import { Col, Row } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import { UpdateUserRequest } from "module/api/service";
import Button from "module/common/component/input/Button/Button";
import TextArea from "module/common/component/input/TextArea/TextArea";
import useTranslate from "module/common/hook/useTranslate";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import { useUpdateUser } from "module/user/query/useUpdateUser";
import { getUserRequestFromUserDTO } from "module/user/util/getUserRequestFromUserDTO";
import { useState } from "react";
import EditProfileName from "../EditProfileName/EditProfileName";
import { EditProfileFieldsFormRoot, HalfWidthTextField } from "./EditProfileFieldsForm.styles";

type UpdateUserFieldsRequest = Omit<UpdateUserRequest, "image" | "header">;

type UpdateUserFields = keyof UpdateUserFieldsRequest;

type HandleSumbitParams = Required<UpdateUserFieldsRequest>;

export const userEditNames: Record<UpdateUserFields, UpdateUserFields> = {
    name: "name",
    description: "description",
    twitter: "twitter",
    discord: "discord",
};

const EditProfileFieldsForm = (): JSX.Element => {
    const t = useTranslate();
    const { data: user = { address: "" } } = useGetWalletUser();
    const { mutateAsync: updateUser } = useUpdateUser();
    const { description, twitter, discord } = user;
    const [validating, setValidating] = useState(false);
    const handleSubmit = async (values: HandleSumbitParams) => {
        const finalUser = { ...user };
        Object.entries(values).forEach(([key, value]) => {
            if (value) {
                finalUser[key as keyof UpdateUserRequest] = value;
            }
        });
        await updateUser(getUserRequestFromUserDTO(finalUser));
    };
    return (
        <EditProfileFieldsFormRoot onSubmit={handleSubmit} css={{ flex: 1 }}>
            <Col flex={1} gap="1.5rem">
                <EditProfileName setValidating={setValidating} validating={validating} />
                <TextArea
                    displayLength
                    maxLength={160}
                    validators={{ maxChars: 160 }}
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
            <Button disabled={validating} type="submit">
                {t("updateProfile")}
            </Button>
        </EditProfileFieldsFormRoot>
    );
};

export default EditProfileFieldsForm;
