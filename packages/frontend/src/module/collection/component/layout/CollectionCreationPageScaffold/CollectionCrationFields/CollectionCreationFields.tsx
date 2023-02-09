import { CollectionCreationFieldsProps } from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCrationFields/CollectionCreationFields.types";
import { Col, Divider, Skeleton, Switch } from "@peersyst/react-components";
import { CollectionCreationFormFields } from "module/collection/types";
import TextField from "module/common/component/input/TextField/TextField";
import TextArea from "module/common/component/input/TextArea/TextArea";
import { config } from "config";
import ColorInput from "module/common/component/input/ColorInput/ColorInput";
import PropertiesInput from "module/nft/component/input/PropertiesInput/PropertiesInput";
import {
    CollectionCreationFieldsCard,
    CollectionCoverInput,
    CollectionImgInput,
} from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCrationFields/CollectionCreationFields.styles";
import useTranslate from "module/common/hook/useTranslate";
import EditCollectionNameTextField from "module/collection/component/input/EditCollectionNameTextField/EditCollectionNameTextField";
import { useEffect, useState } from "react";

function CollectionCreationFields<D extends boolean = false>({
    loading = false,
    header,
    setHeader,
    image,
    setImage,
    name,
    setName,
    description,
    setDescription,
    showDefaults,
    ...defaults
}: CollectionCreationFieldsProps<D>): JSX.Element {
    const translate = useTranslate();
    const translateError = useTranslate("error");

    const {
        transferFee,
        setTransferFee,
        externalUrl,
        setExternalUrl,
        backgroundColor,
        setBackgroundColor,
        burnable,
        setBurnable,
        onlyXRP,
        setOnlyXRP,
        transferable,
        setTransferable,
        attributes,
        setAttributes,
    } = defaults as unknown as CollectionCreationFieldsProps<true>;

    const [defaultName, setDefaultName] = useState<string>();

    useEffect(() => {
        if (!loading) setDefaultName(name);
    }, [loading]);

    return (
        <Skeleton loading={loading} width="100%">
            <CollectionCreationFieldsCard>
                <Col gap="1.5rem">
                    <Col>
                        <CollectionCoverInput
                            name={CollectionCreationFormFields.HEADER}
                            alt="collection-cover-img"
                            value={header}
                            onChange={setHeader}
                        />
                        <div css={{ margin: "-3rem auto 0" }}>
                            <CollectionImgInput
                                name={CollectionCreationFormFields.IMAGE}
                                alt="collection-img"
                                value={image}
                                onChange={setImage}
                            />
                        </div>
                    </Col>
                    <EditCollectionNameTextField key={`collection_name_${defaultName}`} defaultValue={defaultName} onChange={setName} />
                    <TextArea
                        name={CollectionCreationFormFields.DESCRIPTION}
                        label={translate("description")}
                        placeholder={translate("collectionDescriptionPlaceholder")}
                        variant="filled"
                        value={description || undefined}
                        onChange={setDescription}
                        maxLength={config.maxNftDescChars}
                        displayLength
                    />
                    {showDefaults && (
                        <>
                            <TextField
                                name={CollectionCreationFormFields.TRANSFER_FEE}
                                label={translate("transferFee")}
                                placeholder="0"
                                variant="filled"
                                type="number"
                                validators={{ lte: 50, gte: 0 }}
                                error={[!!transferFee && !transferable, translateError("transferableFlagRequired")]}
                                suffix="%"
                                hint={translate("roundsToNDecimals", { decimals: 3 })}
                                value={transferFee?.toString()}
                                onChange={setTransferFee}
                            />
                            <TextField
                                name={CollectionCreationFormFields.EXTERNAL_URL}
                                label={translate("externalLink")}
                                placeholder={translate("externalLinkPlaceholder")}
                                variant="filled"
                                validators={{ url: true }}
                                value={externalUrl || ""}
                                onChange={setExternalUrl}
                            />
                            <ColorInput
                                name={CollectionCreationFormFields.BACKGROUND_COLOR}
                                label={translate("backgroundColor")}
                                TextFieldProps={{
                                    variant: "filled",
                                    placeholder: translate("collectionBackgroundColorPlaceholder"),
                                }}
                                value={backgroundColor || undefined}
                                onChange={setBackgroundColor}
                            />
                            <Divider />
                            <Switch
                                name={CollectionCreationFormFields.BURNABLE}
                                label={translate("burnable")}
                                value={burnable}
                                onChange={setBurnable}
                            />
                            <Switch
                                name={CollectionCreationFormFields.ONLY_XRP}
                                label={translate("onlyXRP")}
                                value={onlyXRP}
                                onChange={setOnlyXRP}
                            />
                            <Switch
                                name={CollectionCreationFormFields.TRANSFERABLE}
                                label={translate("transferable")}
                                value={transferable}
                                onChange={setTransferable}
                            />
                            <Divider />
                            <PropertiesInput
                                name={CollectionCreationFormFields.ATTRIBUTES}
                                label={translate("attributes")}
                                variant="filled"
                                value={attributes}
                                onChange={setAttributes}
                            />
                        </>
                    )}
                </Col>
            </CollectionCreationFieldsCard>
        </Skeleton>
    );
}

export default CollectionCreationFields;
