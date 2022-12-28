import useTranslate from "module/common/hook/useTranslate";
import { DropNftInformationProps } from "module/drop/component/display/DropNftInformation/DropNftInformation.types";
import { InformationField } from "module/common/component/display/InformationFields/InformationFields.types";
import DropInformation from "module/drop/component/display/DropInformation/DropInformation";

const DropNftInformation = ({ collection, additionalFields = [], ...dropInformationProps }: DropNftInformationProps): JSX.Element => {
    const translate = useTranslate();

    const dropFields: InformationField[] = [
        {
            label: translate("collection"),
            content: collection,
        },
        ...additionalFields,
    ];

    return <DropInformation additionalFields={dropFields} {...dropInformationProps} />;
};

export default DropNftInformation;
