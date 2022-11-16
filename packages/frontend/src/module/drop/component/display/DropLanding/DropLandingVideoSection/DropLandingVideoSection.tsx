import { DropLandingVideoSectionProps } from "module/drop/component/display/DropLanding/DropLandingVideoSection/DropLandingVideoSection.types";
import { DropLandingVideoSectionRoot } from "module/drop/component/display/DropLanding/DropLandingVideoSection/DropLandingVideoSection.styles";
import Player from "module/common/component/display/Player/Player";

const DropLandingVideoSection = ({ videoUrl, loading = false, ...rest }: DropLandingVideoSectionProps): JSX.Element => (
    <DropLandingVideoSectionRoot {...rest}>
        <Player url={videoUrl} loading={loading} />
    </DropLandingVideoSectionRoot>
);

export default DropLandingVideoSection;
