import { xrp_studio_logo } from "images";
import { BaseLoadingPage, LogoImage } from "module/common/component/layout/LoadingLogo/LoadingLogo.styles";

const LoadingLogo = (): JSX.Element => {
    return (
        <BaseLoadingPage>
            <LogoImage src={xrp_studio_logo} alt="xrp-studio-logo" />
        </BaseLoadingPage>
    );
};

export default LoadingLogo;
