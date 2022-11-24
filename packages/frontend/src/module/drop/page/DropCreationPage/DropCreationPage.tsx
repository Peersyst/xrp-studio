import { useSearchParams } from "react-router-dom";
import { Form, useModal, useToast } from "@peersyst/react-components";
import { useNavigate } from "react-router-dom";
import { DropCreationForm } from "module/drop/types";
import DropCreationPageHeader from "module/drop/page/DropCreationPage/DropCreationPageHeader/DropCreationPageHeader";
import useGetCollection from "module/nft/query/useGetCollection";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useEffect } from "react";
import DropCreationPageContent from "./DropCreationPageContent/DropCreationPageContent";
import { DashboardRoutes } from "module/dashboard/DashboardRouter";
import useWallet from "module/wallet/hook/useWallet";
import useTranslate from "module/common/hook/useTranslate";
import DropLaunchModal from "module/drop/component/feedback/DropLaunchModal/DropLaunchModal";
import createDropRequestFromForm from "module/drop/util/createDropRequestFromForm";

const DropCreationPage = (): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams();
    const collectionIdQueryParam = searchParams.get("id");
    const collectionId = (function () {
        if (!collectionIdQueryParam) return undefined;
        const parsedCollectionId = Number(collectionIdQueryParam);
        return Number.isNaN(parsedCollectionId) ? undefined : parsedCollectionId;
    })();

    const { showToast } = useToast();
    const { showModal } = useModal();
    const translateError = useTranslate("error");

    const { address } = useWallet();
    const { data: collection, isLoading: collectionLoading } = useGetCollection(collectionId);
    const navigate = useNavigate();

    const handleSubmit = async (data: DropCreationForm) => {
        showModal(DropLaunchModal, { request: createDropRequestFromForm(data), collectionId: collectionId! });
    };

    useEffect(() => {
        if (collectionId === undefined) navigate(DashboardRoutes.MAIN);
        else if (!collectionLoading) {
            if (!collection) {
                searchParams.delete("id");
                setSearchParams(searchParams);
            } else if (collection.account !== address) {
                searchParams.delete("id");
                setSearchParams(searchParams);
                showToast(translateError("collectionNotOwned"), { type: "warning" });
            }
        }
    }, [collectionId, collection, collectionLoading, address]);

    return (
        <Form onSubmit={handleSubmit}>
            <BasePage>
                {{
                    header: <DropCreationPageHeader />,
                    content: <DropCreationPageContent collection={collection} loading={collectionLoading} />,
                }}
            </BasePage>
        </Form>
    );
};

export default DropCreationPage;
