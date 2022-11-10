import { BaseNftPageContentCard } from "module/nft/component/layout/BaseNftPage/BaseNftPageContent/BaseNftPageContent.styles";
import { NftFormFields } from "module/nft/page/NftCreationPage/NftCreationPage.types";
import { capitalize } from "@peersyst/react-utils";
import TextField from "module/common/component/input/TextField/TextField";
import useTranslate from "module/common/hook/useTranslate";
import Select from "module/common/component/input/Select/Select";
import { Col, Switch } from "@peersyst/react-components";

const NftInformation = (): JSX.Element => {
    const name = "nft1";
    const translate = useTranslate();
    const taxon = "nft1";
    const transferFee = "0";
    const issuer = "issuer";
    const burnable = true;
    const onlyXRP = true;
    const trustLine = true;
    const transferable = true;

    return (
        <BaseNftPageContentCard>
            <Col gap="1.5rem">
                <TextField
                    key={"name: " + name}
                    name={NftFormFields.name}
                    label={capitalize(translate("name"))}
                    placeholder={translate("nftNamePlaceholder")}
                    defaultValue={name}
                    disabled={true}
                />
                <Select
                    key={"taxon: " + taxon}
                    clear={translate("none", { context: "female" })}
                    name={NftFormFields.collection}
                    label={translate("collection")}
                    placeholder={translate("collectionPlaceholder")}
                    size="lg"
                    options={[]}
                    defaultValue={taxon}
                    disabled={true}
                />
                <TextField
                    key={"issuer: " + issuer}
                    name={NftFormFields.issuer}
                    label={translate("issuer")}
                    placeholder={issuer}
                    variant="filled"
                    defaultValue={issuer}
                    validators={{ address: true }}
                    disabled={true}
                />
                <TextField
                    key={"transferFee: " + transferFee?.toString()}
                    name={NftFormFields.transferFee}
                    label={capitalize(translate("transferFee"))}
                    placeholder="0"
                    defaultValue={transferFee}
                    disabled={true}
                />
                <Switch
                    key={"burnable: " + JSON.stringify(burnable)}
                    name={NftFormFields.burnable}
                    label={translate("burnable")}
                    defaultValue={burnable}
                    disabled={true}
                />
                <Switch
                    key={"onlyXRP: " + JSON.stringify(onlyXRP)}
                    name={NftFormFields.onlyXRP}
                    label={translate("onlyXRP")}
                    defaultValue={onlyXRP}
                    disabled={true}
                />
                <Switch
                    key={"trustLine: " + JSON.stringify(trustLine)}
                    name={NftFormFields.trustLine}
                    label={translate("trustLine")}
                    defaultValue={trustLine}
                    disabled={true}
                />
                <Switch
                    key={"transferable: " + JSON.stringify(transferable)}
                    name={NftFormFields.transferable}
                    label={translate("transferable")}
                    defaultValue={transferable}
                    disabled={true}
                />
            </Col>
        </BaseNftPageContentCard>
    );
};

export default NftInformation;
