import { CollectionDto } from "module/api/service";
import { ReactNode, useState } from "react";
import useTranslate from "module/common/hook/useTranslate";
import useWallet from "module/wallet/component/hooks/useWallet";
import parseFlags from "module/nft/util/parseFlags";
import { Divider, SelectOption, Switch } from "@peersyst/react-components";
import BaseNftPageContent from "module/nft/component/layout/BaseNftPage/BaseNftPageContent/BaseNftPageContent";
import ImageInput from "module/common/component/input/ImageInput/ImageInput";
import TextField from "module/common/component/input/TextField/TextField";
import { capitalize } from "@peersyst/react-utils";
import TextArea from "module/common/component/input/TextArea/TextArea";
import { config } from "config";
import Select from "module/common/component/input/Select/Select";
import ColorInput from "module/common/component/input/ColorInput/ColorInput";
import Color from "color";
import PropertiesInput from "module/nft/component/input/PropertiesInput/PropertiesInput";
import { BaseNftPageContentLeftSlot } from "module/nft/component/layout/BaseNftPage/BaseNftPageContent/BaseNftPageContentSlots";
import { NftFormFields } from "module/nft/page/NftCreationPage/NftCreationPage.types";
import { CreationNft } from "module/nft/types";

export interface UseNftCreationPageSlotsParams {
    nft: CreationNft | undefined;
    collections?: CollectionDto[];
    fixedCollection?: boolean;
    loading?: boolean;
}

/**
 * Returns NftCreationPageContent slots
 * Cannot be a normal component as it would break the slots, because it would generate a wrapper object.
 * @param nft
 * @param collections
 * @param fixedCollection
 * @param loading
 */
export default function ({ nft, collections, fixedCollection, loading = false }: UseNftCreationPageSlotsParams): ReactNode {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { address: connectedWalletAddress } = useWallet();

    const [transferableValue, setTransferableValue] = useState(false);
    const [transferFeeValue, setTransferFeeValue] = useState("");

    const {
        issuer,
        transferFee,
        metadata: { image = "", name = "", description = "", externalUrl = "", attributes = [], backgroundColor = "" } = {},
        collection: nftCollection,
        flags = 0,
    } = nft || {};

    const taxon = nftCollection?.taxon;
    const { burnable, onlyXRP, trustLine, transferable } = typeof flags === "number" ? parseFlags(flags) : flags;

    const collectionOptions: SelectOption<number>[] = (collections || (nftCollection ? [nftCollection] : [])).map((collection) => ({
        value: collection.taxon,
        label: collection.name || collection.taxon.toString(),
    }));

    return (
        <>
            <BaseNftPageContent.Left>
                <BaseNftPageContentLeftSlot.Image loading={loading}>
                    <ImageInput key={"image: " + image} name={NftFormFields.image} alt="nft-image" defaultValue={image} />
                </BaseNftPageContentLeftSlot.Image>
                <BaseNftPageContentLeftSlot.Info loading={loading}>
                    <TextField
                        key={"name: " + name}
                        name={NftFormFields.name}
                        label={capitalize(translate("name"))}
                        placeholder={translate("nftNamePlaceholder")}
                        defaultValue={name}
                    />
                    <TextArea
                        key={"description: " + description}
                        name={NftFormFields.description}
                        label={translate("description")}
                        placeholder={translate("nftDescriptionPlaceholder")}
                        maxLength={config.maxNftDescChars}
                        defaultValue={description || ""}
                    />
                </BaseNftPageContentLeftSlot.Info>
            </BaseNftPageContent.Left>
            <BaseNftPageContent.Right loading={loading}>
                <Select
                    key={"taxon: " + taxon}
                    clear={translate("none", { context: "female" })}
                    name={NftFormFields.collection}
                    label={translate("collection")}
                    placeholder={translate("collectionPlaceholder")}
                    size="lg"
                    options={collectionOptions}
                    defaultValue={taxon}
                    disabled={fixedCollection}
                />
                <TextField
                    key={"issuer: " + issuer}
                    name={NftFormFields.issuer}
                    label={translate("issuer")}
                    placeholder={connectedWalletAddress}
                    variant="filled"
                    defaultValue={issuer}
                    validators={{ address: true }}
                />
                <TextField
                    key={"transferFee: " + transferFee?.toString()}
                    name={NftFormFields.transferFee}
                    label={translate("transferFee")}
                    placeholder="0"
                    variant="filled"
                    defaultValue={transferFee?.toString()}
                    type="number"
                    validators={{ lte: 50, gte: 0 }}
                    error={[!!transferFeeValue && !transferableValue, translateError("transferableFlagRequired")]}
                    suffix="%"
                    hint={translate("roundsToNDecimals", { decimals: 3 })}
                    value={transferFeeValue}
                    onChange={setTransferFeeValue}
                />
                <TextField
                    key={"externalUrl: " + externalUrl}
                    name={NftFormFields.externalUrl}
                    label={translate("externalLink")}
                    placeholder={translate("externalLinkPlaceholder")}
                    variant="filled"
                    defaultValue={externalUrl}
                    validators={{ url: true }}
                />
                <ColorInput
                    key={"backgroundColor: " + backgroundColor}
                    name={NftFormFields.backgroundColor}
                    label={translate("backgroundColor")}
                    TextFieldProps={{ variant: "filled", placeholder: translate("nftBackgroundColorPlaceholder") }}
                    defaultValue={backgroundColor ? new Color(backgroundColor) : undefined}
                />
                <Divider />
                <Switch
                    key={"burnable: " + JSON.stringify(burnable)}
                    name={NftFormFields.burnable}
                    label={translate("burnable")}
                    defaultValue={burnable}
                />
                <Switch
                    key={"onlyXRP: " + JSON.stringify(onlyXRP)}
                    name={NftFormFields.onlyXRP}
                    label={translate("onlyXRP")}
                    defaultValue={onlyXRP}
                />
                <Switch
                    key={"trustLine: " + JSON.stringify(trustLine)}
                    name={NftFormFields.trustLine}
                    label={translate("trustLine")}
                    defaultValue={trustLine}
                />
                <Switch
                    key={"transferable: " + JSON.stringify(transferable)}
                    name={NftFormFields.transferable}
                    label={translate("transferable")}
                    defaultValue={transferable}
                    value={transferableValue}
                    onChange={setTransferableValue}
                />
                <Divider />
                <PropertiesInput
                    key={"attributes: " + JSON.stringify(attributes)}
                    name={NftFormFields.attributes}
                    label={translate("attributes")}
                    defaultValue={attributes}
                    variant="filled"
                />
            </BaseNftPageContent.Right>
        </>
    );
}
