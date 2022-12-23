import { CollectionInformationProps } from "module/collection/component/display/CollectionInformation/CollectionInformation.types";
import { Col } from "@peersyst/react-components";
import CollectionCover from "module/collection/component/display/CollectionCover/CollectionCover";
import useTranslate from "module/common/hook/useTranslate";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { InformationField } from "module/common/component/display/InformationFields/InformationFields.types";
import InformationFields from "module/common/component/display/InformationFields/InformationFields";

const CollectionInformation = ({
    header,
    image,
    name = "Loading name",
    items = 0,
    loading,
    additionalFields = [],
}: CollectionInformationProps): JSX.Element => {
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
        ...additionalFields,
    ];

    return (
        <Col>
            <CollectionCover header={header} image={image} loading={loading} />
            <InformationFields fields={collectionFields} loading={loading} />
        </Col>
    );
};

export default CollectionInformation;
