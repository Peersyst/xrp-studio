import { config } from "config";
import { google_play_store, ios_app_store } from "images";
import { Image } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import { cx } from "@peersyst/react-utils";
import { XummAppLinkProps, XummAppLinkType } from "module/wallet/component/navigation/XummAppLink/XummAppLink.types";

const XummAppLink: XummAppLinkType = (({ img, link, alt }: XummAppLinkProps): JSX.Element => {
    return (
        <a href={link} target="_blank" rel="noreferrer" className={cx("xumm-app-link", alt)}>
            <Button size="lg">
                <Image css={{ height: "2rem", width: "100%" }} src={img} alt={alt} />
            </Button>
        </a>
    );
}) as XummAppLinkType;

XummAppLink.PlayStore = (): JSX.Element => <XummAppLink link={config.playStoreXummLink} img={google_play_store} alt="play-store-logo" />;
XummAppLink.AppStore = (): JSX.Element => <XummAppLink link={config.appStoreXummLink} img={ios_app_store} alt="app-store-logo" />;

export default XummAppLink;
