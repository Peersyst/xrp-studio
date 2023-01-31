import { useSearchParams } from "react-router-dom";
import { Form, useToast } from "@peersyst/react-components";
import { useNavigate } from "react-router-dom";
import { DropCreationForm } from "module/drop/types";
import DropCreationPageHeader from "module/drop/page/DropCreationPage/DropCreationPageHeader/DropCreationPageHeader";
import useGetCollection from "module/collection/query/useGetCollection";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useEffect, useState } from "react";
import DropCreationPageContent from "./DropCreationPageContent/DropCreationPageContent";
import useWallet from "module/wallet/hook/useWallet";
import useTranslate from "module/common/hook/useTranslate";
import createDropRequestFromForm, { CreateDropFormRequest } from "module/drop/util/createDropRequestFromForm";
import { LandingRoutes } from "module/landing/LandingRouter";
import DropLaunchInformationDialog from "module/drop/component/feedback/DropLaunchInformationDialog/DropLaunchInformationDialog";

const DropCreationPage = (): JSX.Element => {
    const [searchParams] = useSearchParams();
    const collectionIdQueryParam = searchParams.get("id");
    const [collectionId, setCollectionId] = useState<number>();

    useEffect(() => {
        setCollectionId(Number(collectionIdQueryParam));
    }, [collectionIdQueryParam]);

    const { showToast } = useToast();
    const translateError = useTranslate("error");
    const [showInformationDialog, setShowInformationDialog] = useState(false);
    const [request, setRequest] = useState<CreateDropFormRequest | undefined>();

    const { address } = useWallet();
    const { data: collection, isLoading: collectionLoading } = useGetCollection(collectionId);
    const navigate = useNavigate();

    const handleSubmit = async (data: DropCreationForm) => {
        setRequest(createDropRequestFromForm(collection!.id, data));
        setShowInformationDialog(true);
    };

    useEffect(() => {
        if (collectionIdQueryParam === null || (collectionId !== undefined && (Number.isNaN(collectionId) || collectionId < 1)))
            navigate(LandingRoutes.HOME);
        else if (collectionId && !collectionLoading) {
            if (!collection) {
                navigate(LandingRoutes.HOME);
            } else if (collection.account !== address) {
                showToast(translateError("collectionNotOwned"), { type: "warning" });
                navigate(LandingRoutes.HOME);
            }
        }
    }, [collectionIdQueryParam, collectionId, collection, collectionLoading, address]);

    return (
        <Form onSubmit={handleSubmit}>
            <DropLaunchInformationDialog
                open={showInformationDialog}
                onClose={() => setShowInformationDialog(false)}
                collection={collection}
                request={request}
            />
            <BasePage>
                {{
                    header: <DropCreationPageHeader loading={collectionLoading} />,
                    content: <DropCreationPageContent collection={collection} loading={collectionLoading} />,
                }}
            </BasePage>
        </Form>
    );
};

export default DropCreationPage;
