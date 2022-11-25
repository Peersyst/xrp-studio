import { CollectionCreationPageContentProps } from "module/collection/page/CollectionCreationPage/CollectionCreationPageContent/CollectionCreationPageContent.types";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import { Col, Row, Skeleton, Typography, WithLoading } from "@peersyst/react-components";
import { CollectionCreationPageContentCard } from "module/collection/page/CollectionCreationPage/CollectionCreationPageContent/CollectionCreationPageContent.styles";
import TextField from "module/common/component/input/TextField/TextField";
import useTranslate from "module/common/hook/useTranslate";
import ColorInput from "module/common/component/input/ColorInput/ColorInput";
import { DropCreationState } from "module/drop/state/DropCreationState";
import useDropCreationState from "module/drop/hook/useDropCreationState";
import { DropCreationFormFields } from "module/drop/types";
import FaqsInput from "module/drop/component/input/FaqsInput/FaqsInput";
import DropLanding from "module/drop/component/display/DropLanding/DropLanding";
import { useGetCollectionNfts } from "module/nft/query/useGetCollectionNfts";
import { usePaginatedList } from "@peersyst/react-hooks";
import { XrpIcon } from "icons";

const DropCreationPageContent = ({ loading = false, collection }: WithLoading<CollectionCreationPageContentProps>): JSX.Element => {
    const translate = useTranslate();

    const { data: paginatedNfts, isLoading: loadingNfts } = useGetCollectionNfts(collection?.id);
    const nfts = usePaginatedList(paginatedNfts?.pages, (page) => page.items);

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
                            price,
                            items: collection?.items || 500,
                            soldItems: collection?.items || 500,
                            backgroundColor: backgroundColor.hex(),
                            fontColor: fontColor.hex(),
                            videoUrl,
                            instagram,
                            discord,
                            twitter,
                            faqs,
                            collection: collection!,
                        }}
                        loadingNfts={loadingNfts}
                        nfts={nfts}
                    />
                </Col>
                <Col flex={3} alignItems="center">
                    <Skeleton loading={loading} width="100%">
                        <CollectionCreationPageContentCard>
                            <Col gap="1.5rem">
                                <TextField
                                    name={DropCreationFormFields.PRICE}
                                    label={translate("price")}
                                    placeholder={translate("price")}
                                    variant="filled"
                                    value={price}
                                    required
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
                                    validators={{ url: true }}
                                    value={instagram}
                                    onChange={normalizedHandleChange("instagram")}
                                />
                                <TextField
                                    name={DropCreationFormFields.TWITTER}
                                    placeholder={translate("twitter")}
                                    variant="filled"
                                    validators={{ url: true }}
                                    value={twitter}
                                    onChange={normalizedHandleChange("twitter")}
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
                        </CollectionCreationPageContentCard>
                    </Skeleton>
                </Col>
            </Row>
        </PageContent>
    );
};

export default DropCreationPageContent;
