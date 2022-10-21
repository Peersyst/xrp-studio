import { BaseNftPageFormProps } from "module/nft/component/layout/BaseNftPage/BaseNftPage.types";
import { Col, Divider, Row, SelectOption, Skeleton, Switch } from "@peersyst/react-components";
import ImageInput from "module/common/component/input/ImageInput/ImageInput";
import TextField from "module/common/component/input/TextField/TextField";
import TextArea from "module/common/component/input/TextArea/TextArea";
import { config } from "config";
import Card from "module/common/component/surface/Card/Card";
import Select from "module/common/component/input/Select/Select";
import ColorInput from "module/common/component/input/ColorInput/ColorInput";
import PropertiesInput from "module/nft/component/input/PropertiesInput/PropertiesInput";
import useBaseNftPagePlaceholders from "module/nft/component/layout/BaseNftPage/hook/useBaseNftPagePlaceholders";
import useTranslate from "module/common/hook/useTranslate";
import parseFlags from "module/nft/util/parseFlags";

const BaseNftPageForm = ({ nft, collections, loading, readonly, fixedCollection }: BaseNftPageFormProps): JSX.Element => {
    const translate = useTranslate();

    const { metadata: nftMetadata, collection: nftCollection, flags = 0 } = nft || {};

    // Generate collections Select options
    const collectionOptions: SelectOption<number>[] = (collections || (nftCollection ? [nftCollection] : [])).map((collection) => ({
        value: collection.taxon,
        label: collection.name || collection.taxon.toString(),
    }));

    // Parse flags
    const { burnable, onlyXRP, trustLine, transferable } = parseFlags(flags);

    // Get placeholders
    const { namePlaceholder, descriptionPlaceholder, collectionPlaceholder, externalLinkPlaceholder, backgroundColorPlaceholder } =
        useBaseNftPagePlaceholders({ readonly });

    return (
        <Row key={JSON.stringify(nft)} gap="1.5rem" flex={1} breakpoint={{ width: "mini", alignItems: "stretch", gap: "1.5rem" }}>
            <Col gap="3rem" flex={1}>
                <Skeleton loading={loading} width="100%" style={{ aspectRatio: "1" }}>
                    <ImageInput
                        name="image"
                        alt="nft-image"
                        defaultValue={nftMetadata?.image}
                        readonly={readonly}
                        css={{ aspectRatio: "1", height: "auto" }}
                    />
                </Skeleton>
                <Col gap="1.5rem" flex={1}>
                    <Skeleton loading={loading} width="100%">
                        <TextField
                            name="name"
                            label={translate("name")}
                            placeholder={namePlaceholder}
                            defaultValue={nftMetadata?.name}
                            readonly={readonly}
                        />
                    </Skeleton>
                    <Skeleton loading={loading} width="100%">
                        <TextArea
                            name="description"
                            label={translate("description")}
                            placeholder={descriptionPlaceholder}
                            maxLength={config.maxNftDescChars}
                            displayLength={!readonly}
                            defaultValue={nftMetadata?.description}
                            readonly={readonly}
                        />
                    </Skeleton>
                </Col>
            </Col>
            <Col flex={1}>
                <Skeleton loading={loading} width="100%">
                    <Card css={{ width: "100%", padding: "1.5rem" }}>
                        <Col gap="1.5rem" flex={1}>
                            <Select
                                clear={translate("none", { context: "female" })}
                                name="collection"
                                label={translate("collection")}
                                placeholder={collectionPlaceholder}
                                size="lg"
                                options={collectionOptions}
                                defaultValue={nftCollection?.taxon}
                                readonly={readonly}
                                disabled={fixedCollection}
                                DropdownComponent={readonly ? () => <></> : undefined}
                            />
                            <TextField
                                name="externalLink"
                                label={translate("externalLink")}
                                placeholder={externalLinkPlaceholder}
                                variant="filled"
                                defaultValue={nftMetadata?.externalUrl}
                                readonly={readonly}
                            />
                            <ColorInput
                                name="backgroundColor"
                                label={translate("backgroundColor")}
                                TextFieldProps={{ variant: "filled", placeholder: backgroundColorPlaceholder }}
                                defaultValue={nftMetadata?.backgroundColor}
                                readonly={readonly}
                            />
                            <Divider />
                            <Switch name="burnable" label={translate("burnable")} defaultValue={burnable} readonly={readonly} />
                            <Switch name="onlyXRP" label={translate("onlyXRP")} defaultValue={onlyXRP} readonly={readonly} />
                            <Switch name="trustLine" label={translate("trustLine")} defaultValue={trustLine} readonly={readonly} />
                            <Switch name="transferable" label={translate("transferable")} defaultValue={transferable} readonly={readonly} />
                            <Divider />
                            <PropertiesInput
                                name="attributes"
                                label={translate("attributes")}
                                defaultValue={nftMetadata?.attributes}
                                readonly={readonly}
                            />
                        </Col>
                    </Card>
                </Skeleton>
            </Col>
        </Row>
    );
};

export default BaseNftPageForm;