import useTranslate from "module/common/hook/useTranslate";
import { Row, Typography } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import { InformationField } from "module/common/component/display/InformationFields/InformationFields.types";
import InformationFields from "module/common/component/display/InformationFields/InformationFields";
import { DropNftBuyModalInformationProps } from "./DropNftBuyModalInformation.types";

const DropNftBuyModalInformation = ({
    drop: { videoUrl: videoUrl, twitter: twitter, instagram: instagram, discord: discord },
    collection,
}: DropNftBuyModalInformationProps): JSX.Element => {
    const translate = useTranslate();

    const isDataProvided = videoUrl || twitter || instagram || discord || collection;

    const informationFields: InformationField[] = [
        {
            label: capitalize(translate("videoTrailerURL")),
            content: videoUrl,
        },
        {
            label: translate("collection"),
            content: collection,
        },
        {
            label: translate("twitter"),
            content: twitter,
        },
        {
            label: translate("instagram"),
            content: instagram,
        },
        {
            label: translate("discord"),
            content: discord,
        },
    ];

    return isDataProvided ? (
        <InformationFields fields={informationFields} />
    ) : (
        <Row flex={1} justifyContent="center" alignItems="center">
            <Typography variant="h6" textAlign="center">
                {translate("noDataProvided")}
            </Typography>
        </Row>
    );
};

export default DropNftBuyModalInformation;
