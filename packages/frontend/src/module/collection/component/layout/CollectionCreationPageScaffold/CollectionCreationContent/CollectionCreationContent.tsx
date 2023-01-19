import { Col, Row } from "@peersyst/react-components";
import { CollectionCreationContentProps } from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationContent/CollectionCreationContent.types";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import CollectionCreationDrafts from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationDrafts/CollectionCreationDrafts";
import CollectionCreationFields from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCrationFields/CollectionCreationFields";
import { CollectionCreationDraftsProps } from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationDrafts/CollectionCreationDrafts.types";
import { CollectionCreationFieldsProps } from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCrationFields/CollectionCreationFields.types";

function CollectionCreationContent<D extends boolean = false>({
    loading = false,
    totalNfts,
    drafts,
    draftLink,
    onDraftsAdded,
    onDraftRemoved,
    header,
    setHeader,
    image,
    setImage,
    name,
    setName,
    description,
    setDescription,
    showDefaults,
    children,
    ...defaults
}: CollectionCreationContentProps<D>): JSX.Element {
    const { transferFee, externalUrl, backgroundColor, burnable, onlyXRP, transferable, attributes } =
        defaults as unknown as CollectionCreationContentProps<true>;

    const collectionCreationDraftsProps: CollectionCreationDraftsProps = {
        loading,
        totalNfts,
        drafts,
        draftLink,
        onDraftsAdded,
        onDraftRemoved,
        name,
        description,
        transferFee,
        externalUrl,
        backgroundColor,
        burnable,
        onlyXRP,
        transferable,
        attributes,
    };

    // CollectionCreationFieldsProps generic type is not relevant for this component
    const collectionCreationFieldsProps: CollectionCreationFieldsProps<any> = {
        loading,
        header,
        setHeader,
        image,
        setImage,
        name,
        setName,
        description,
        setDescription,
        showDefaults,
        ...defaults,
    };

    return (
        <PageContent>
            <Col flex={1} gap="1.5rem">
                <Row
                    flex={1}
                    gap="1.5rem"
                    breakpoint={{ width: "createCollectionPage", alignItems: "stretch", gap: "1.5rem", reverse: true }}
                >
                    <Col flex={4}>
                        <CollectionCreationDrafts {...collectionCreationDraftsProps} />
                    </Col>
                    <Col flex={3} alignItems="center">
                        <CollectionCreationFields {...collectionCreationFieldsProps} />
                    </Col>
                </Row>
                {children}
            </Col>
        </PageContent>
    );
}

export default CollectionCreationContent;
