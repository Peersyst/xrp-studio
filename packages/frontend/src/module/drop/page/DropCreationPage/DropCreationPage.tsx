import { useSearchParams } from "react-router-dom";
import { Form } from "@peersyst/react-components";
import { useNavigate } from "react-router-dom";
import { DropCreationForm } from "module/drop/types";
import DropCreationPageHeader from "module/drop/page/DropCreationPage/DropCreationPageHeader/DropCreationPageHeader";
import useGetCollection from "module/collection/query/useGetCollection";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useEffect, useState } from "react";
import DropCreationPageContent from "./DropCreationPageContent/DropCreationPageContent";
import useWallet from "module/wallet/hook/useWallet";
import createDropRequestFromForm, { CreateDropFormRequest } from "module/drop/util/createDropRequestFromForm";
import DropLaunchInformationDialog from "module/drop/component/feedback/DropLaunchInformationDialog/DropLaunchInformationDialog";
import { DropRoutes } from "module/drop/DropRouter";
import useCollectionIsDrop from "module/drop/query/useCollectionIsDrop";
import NotFoundPage from "module/common/page/NotFoundPage/NotFoundPage";
import { useResetRecoilState } from "recoil";
import dropCreationState from "module/drop/state/DropCreationState";

const DropCreationPage = (): JSX.Element => {
    const [searchParams] = useSearchParams();
    const collectionIdQueryParam = searchParams.get("id");
    const [collectionId, setCollectionId] = useState<number>();
    const resetDropState = useResetRecoilState(dropCreationState);

    useEffect(() => {
        setCollectionId(Number(collectionIdQueryParam));
    }, [collectionIdQueryParam]);

    const [showInformationDialog, setShowInformationDialog] = useState(false);
    const [request, setRequest] = useState<CreateDropFormRequest | undefined>();

    const { address } = useWallet();
    const { data: collectionIsDrop, isLoading: dropLoading } = useCollectionIsDrop(collectionId);
    const { data: collection, isLoading: collectionLoading } = useGetCollection(collectionId, { enabled: !Number.isNaN(collectionId) });
    const loading = dropLoading || collectionLoading;

    const navigate = useNavigate();

    const handleSubmit = async (data: DropCreationForm) => {
        setRequest(createDropRequestFromForm(collection!.id, data));
        setShowInformationDialog(true);
    };

    useEffect(() => {
        //Unmount cleanup
        return () => {
            resetDropState();
        };
    }, []);

    if ((!collectionLoading && !collection) || (collection && collection.account !== address)) return <NotFoundPage />;
    else if (!loading && collectionIsDrop) {
        navigate(DropRoutes.DROP.replace(":path", collection!.path));
    }

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
                    header: <DropCreationPageHeader loading={loading} />,
                    content: <DropCreationPageContent collection={collection} loading={loading} />,
                }}
            </BasePage>
        </Form>
    );
};

export default DropCreationPage;
