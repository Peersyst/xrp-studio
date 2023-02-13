import { ios_app_store, google_play_store } from "images";
import AppLink from "./AppLink";
import { AppLinkLogosProps } from "./AppLinks.types";

const AppLinkLogos = ({ appStoreLink, googlePlayLink }: AppLinkLogosProps): JSX.Element => {
    return (
        <>
            <AppLink link={appStoreLink} img={ios_app_store} alt="app-store-logo" />
            <AppLink link={googlePlayLink} img={google_play_store} alt="play-store-logo" />
        </>
    );
};

export default AppLinkLogos;
