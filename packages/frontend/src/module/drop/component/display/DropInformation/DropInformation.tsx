import { DropInformationProps } from "module/drop/component/display/DropInformation/DropInformation.types";
import useTranslate from "module/common/hook/useTranslate";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { InformationField } from "module/common/component/display/InformationFields/InformationFields.types";
import CollectionInformation from "module/collection/component/display/CollectionInformation/CollectionInformation";
import { Row } from "@peersyst/react-components";
import { XrpIcon } from "icons";

const DropInformation = ({ price = "0", additionalFields = [], ...collectionInformationProps }: DropInformationProps): JSX.Element => {
    const translate = useTranslate();
    const formatNumber = useFormatNumber();

    const dropFields: InformationField[] = [
        {
            label: translate("price"),
            content: (
                <Row gap="0.25rem" alignItems="center">
                    <XrpIcon />
                    {formatNumber(price)}
                </Row>
            ),
        },
        ...additionalFields,
    ];

    return <CollectionInformation additionalFields={dropFields} {...collectionInformationProps} />;
};

export default DropInformation;
