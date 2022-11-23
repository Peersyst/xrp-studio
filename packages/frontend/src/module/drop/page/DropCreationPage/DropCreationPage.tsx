import { useSearchParams } from "react-router-dom";
import { Form } from "@peersyst/react-components";
import { useNavigate } from "react-router-dom";
import { DropCreationForm } from "module/drop/types";
import DropCreationPageHeader from "module/drop/page/DropCreationPage/DropCreationPageHeader/DropCreationPageHeader";
import useGetCollection from "module/nft/query/useGetCollection";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useEffect } from "react";
import { DropRoutes } from "module/drop/DropRouter";
import DropCreationPageContent from "./DropCreationPageContent/DropCreationPageContent";

const DropCreationPage = (): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams();
    const collectionId = searchParams.get("id");

    const { data: collection, isLoading } = useGetCollection(collectionId ? Number(collectionId) : undefined);
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSubmit = async (data: DropCreationForm, action?: string) => {
        //TODO : Launch
        navigate(DropRoutes.MY_DROPS, { replace: true });
    };

    useEffect(() => {
        if (collectionId !== null && !isLoading && !collection) {
            searchParams.delete("id");
            setSearchParams(searchParams);
        }
    }, [collection]);

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
