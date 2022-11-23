import { CollectionPublishInformationProps } from "module/collection/component/feedback/CollectionPublishModal/CollectionPublishInformation/CollectionPublishInformation.types";
import useTranslate from "module/common/hook/useTranslate";
import { InformationField } from "module/common/component/display/InformationFields/InformationFields.types";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import InformationFields from "module/common/component/display/InformationFields/InformationFields";

const CollectionPublishInformation = ({ name, items }: CollectionPublishInformationProps): JSX.Element => {
    const translate = useTranslate();
    const formatNumber = useFormatNumber();

    const collectionFields: InformationField[] = [
        {
            label: translate("name"),
            content: name,
        },
        {
            label: translate("items"),
            content: formatNumber(items),
        },
    ];

    return <InformationFields fields={collectionFields} />;
};

export default CollectionPublishInformation;
