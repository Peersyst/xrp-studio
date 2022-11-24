import PublishResult from "module/common/component/feedback/PublishResult/PublishResult";
import { Fragment } from "react";

const NftPublishError = (): JSX.Element => {
    return (
        <PublishResult title={"Something bad happened..."} type="error">
            <Fragment />
        </PublishResult>
    );
};

export default NftPublishError;
