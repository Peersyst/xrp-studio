import PageContent from "module/common/component/layout/PageContent/PageContent";
import { Col, Row, Skeleton, Typography, WithLoading } from "@peersyst/react-components";
import TextField from "module/common/component/input/TextField/TextField";
import useTranslate from "module/common/hook/useTranslate";
import ColorInput from "module/common/component/input/ColorInput/ColorInput";
import { DropCreationState } from "module/drop/state/DropCreationState";
import useDropCreationState from "module/drop/hook/useDropCreationState";
import { DropCreationFormFields } from "module/drop/types";
import FaqsInput from "module/drop/component/input/FaqsInput/FaqsInput";
import DropLanding from "module/drop/component/display/DropLanding/DropLanding";
import { XrpIcon } from "icons";
import { xrpToDrops } from "xrpl";
import { DropCreationPageContentProps } from "module/drop/page/DropCreationPage/DropCreationPageContent/DropCreationPageContent.types";
import { CollectionCreationFieldsCard } from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCrationFields/CollectionCreationFields.styles";
import { config } from "config";

const DropCreationPageContent = ({ loading = false, collection }: WithLoading<DropCreationPageContentProps>): JSX.Element => {
    const translate = useTranslate();

    const [{ backgroundColor, videoUrl, instagram, discord, twitter, faqs, price, fontColor }, setDropCreationState] =
        useDropCreationState();

    function normalizedHandleChange<K extends keyof DropCreationState>(attribute: keyof DropCreationState) {
        return (value: DropCreationState[K]) => setDropCreationState({ [attribute]: value });
    }

    return (
        <PageContent>
            <Row flex={1} gap="1.5rem" breakpoint={{ width: "createCollectionPage", alignItems: "stretch", gap: "1.5rem", reverse: true }}>
                <Col flex={4}>
                    <DropLanding
                        preview
                        loading={loading}
                        drop={{
                            price: price ? xrpToDrops(price) : "0",
                            items: collection?.nfts?.length || 500,
                            soldItems: collection?.nfts?.length || 500,
                            backgroundColor: backgroundColor.hex(),
                            fontColor: fontColor.hex(),
                            videoUrl,
                            instagram,
                            discord,
                            twitter,
                            faqs,
                            collection: collection!,
                        }}
                        loadingNfts={loading}
                        nfts={(collection?.nfts || []).slice(0, 10)}
                    />
                </Col>
                <Col flex={3} alignItems="center">
                    <Skeleton loading={loading} width="100%">
                        <CollectionCreationFieldsCard>
                            <Col gap="1.5rem">
                                <TextField
                                    name={DropCreationFormFields.PRICE}
                                    label={translate("price")}
                                    placeholder={translate("price")}
                                    variant="filled"
                                    value={price}
                                    required
                                    type="number"
                                    onChange={normalizedHandleChange("price")}
                                    suffix={<XrpIcon />}
                                />
                                <ColorInput
                                    name={DropCreationFormFields.BACKGROUND_COLOR}
                                    label={translate("backgroundColor")}
                                    required
                                    TextFieldProps={{
                                        variant: "filled",
                                    }}
                                    value={backgroundColor}
                                    onChange={normalizedHandleChange("backgroundColor")}
                                />
                                <ColorInput
                                    name={DropCreationFormFields.FONT_COLOR}
                                    label={translate("fontColor")}
                                    required
                                    TextFieldProps={{
                                        variant: "filled",
                                    }}
                                    value={fontColor}
                                    onChange={normalizedHandleChange("fontColor")}
                                />
                                <TextField
                                    name={DropCreationFormFields.VIDEO_URL}
                                    label={translate("videoTrailerURL")}
                                    placeholder={translate("videoTrailerURL")}
                                    variant="filled"
                                    validators={{ url: true }}
                                    value={videoUrl}
                                    onChange={normalizedHandleChange("videoUrl")}
                                />
                                <Typography variant="body1" color={"black.50"} className={"Filled"} fontWeight={500}>
                                    {translate("social")}
                                </Typography>
                                <TextField
                                    name={DropCreationFormFields.INSTAGRAM}
                                    placeholder={translate("instagram")}
                                    variant="filled"
                                    value={instagram}
                                    onChange={normalizedHandleChange("instagram")}
                                    validators={{ maxChars: config.maxInstagramUsernameChars }}
                                />
                                <TextField
                                    name={DropCreationFormFields.TWITTER}
                                    placeholder={translate("twitter")}
                                    variant="filled"
                                    value={twitter}
                                    onChange={normalizedHandleChange("twitter")}
                                    validators={{ maxChars: config.maxTwitterUsernameChars }}
                                />
                                <TextField
                                    name={DropCreationFormFields.DISCORD}
                                    placeholder={translate("discord")}
                                    variant="filled"
                                    validators={{ url: true }}
                                    value={discord}
                                    onChange={normalizedHandleChange("discord")}
                                />
                                <Typography variant="body1" color={"black.50"} fontWeight={500}>
                                    {translate("faqs")}
                                </Typography>
                                <FaqsInput
                                    name={DropCreationFormFields.FAQS}
                                    label={translate("faqs")}
                                    variant="filled"
                                    value={faqs}
                                    onChange={normalizedHandleChange("faqs")}
                                />
                            </Col>
                        </CollectionCreationFieldsCard>
                    </Skeleton>
                </Col>
            </Row>
        </PageContent>
    );
};

export default DropCreationPageContent;
