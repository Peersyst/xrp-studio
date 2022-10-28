import EditNftCreationPageHeader from "module/collection/component/layout/EditNftCreationPageHeader/EditNftCreationPageHeader";
import useNftCreationPageSlots from "module/nft/pages/NftCreationPage/hook/useNftCreationPageSlots";
import BaseNftPage from "module/nft/component/layout/BaseNftPage/BaseNftPage";

const EditNftCreationPage = () => {
    const slots = useNftCreationPageSlots();

    return (
        <BaseNftPage>
            {{
                header: <EditNftCreationPageHeader />,
                content: slots,
            }}
        </BaseNftPage>
    );
};

export default EditNftCreationPage;
