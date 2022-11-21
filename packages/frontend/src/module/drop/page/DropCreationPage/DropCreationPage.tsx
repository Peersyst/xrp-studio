import { useSearchParams } from "react-router-dom";
import { Form } from "@peersyst/react-components";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";
import { DropCreationForm } from "module/drop/types";
import DropCreationPageHeader from "module/drop/page/DropCreationPageHeader/DropCreationPageHeader";
import useGetCollection from "module/nft/query/useGetCollection";
import DropCreationPageContent from "../DropCreationPageContent/DropCreationPageContent";
import BasePage from "module/common/component/layout/BasePage/BasePage";

const DropCreationPage = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const collectionId = searchParams.get("id");

    const { data: collection, isLoading: isLoading } = useGetCollection(collectionId ? Number(collectionId) : undefined);
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSubmit = async (data: DropCreationForm, action?: string) => {
        // TODO : crear request de Drop as
        if (action === "save") {
            //TODO : Launch
        } else {
            //TODO : Launch
        }
        navigate(NftRoutes.MY_NFTS, { replace: true });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <BasePage>
                {{
                    header: <DropCreationPageHeader />,
                    content: <DropCreationPageContent collection={collection} loading={isLoading} />,
                }}
            </BasePage>
        </Form>
    );
};

export default DropCreationPage;
