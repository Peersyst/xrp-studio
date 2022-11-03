import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Form, useToast } from "@peersyst/react-components";
import CollectionCreationPageHeader from "module/collection/page/CollectionCreationPage/CollectionCreationPageHeader/CollectionCreationPageHeader";
import { useSearchParams } from "react-router-dom";
import useGetCollection from "module/collection/query/useGetCollection";
import useWallet from "module/wallet/component/hooks/useWallet";
import { useEffect } from "react";
import useTranslate from "module/common/hook/useTranslate";
import CollectionCreationPageContent from "module/collection/page/CollectionCreationPage/CollectionCreationPageContent/CollectionCreationPageContent";

const CollectionCreationPage = (): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams();
    const collectionId = searchParams.get("id");
    const { data: collection, isLoading: collectionLoading } = useGetCollection(collectionId ? Number(collectionId) : undefined);

    const translateError = useTranslate("error");
    const { showToast } = useToast();

    const { address: userAddress } = useWallet();
    useEffect(() => {
        if (collection && collection.user.address !== userAddress) {
            showToast(translateError("collectionNotOwned", { type: "warning" }));
            searchParams.delete("id");
            setSearchParams(searchParams);
        } else if (!collectionLoading && !collection) {
            searchParams.delete("id");
            setSearchParams(searchParams);
        }
    }, [collectionLoading, collection]);

    return (
        <Form onSubmit={() => undefined}>
            <BasePage>
                {{
                    header: <CollectionCreationPageHeader loading={collectionLoading} />,
                    content: <CollectionCreationPageContent collection={collection} loading={collectionLoading} />,
                }}
            </BasePage>
        </Form>
    );
};

export default CollectionCreationPage;
