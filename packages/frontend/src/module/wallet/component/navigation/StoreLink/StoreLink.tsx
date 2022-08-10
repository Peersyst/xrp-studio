import { StoreLinkProps, StoreLinksType } from "./StoreLink.types";
import { config } from "config";
import { googleplaystore, iosappstore } from "images";
import { Image } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import { cx } from "@peersyst/react-utils";

export const storeLinks: StoreLinksType = {
    appStore: {
        url: config.appStoreXummLink,
        image: iosappstore,
        alt: "app-store-logo",
    },
    playStore: {
        url: config.playStoreXummLink,
        image: googleplaystore,
        alt: "play-store-logo",
    },
};

const StoreLink = ({ type, className, style }: StoreLinkProps): JSX.Element => {
    return (
        <a
            href={storeLinks[type].url}
            target="_blank"
            rel="noreferrer"
            style={style}
            className={cx("store-link", storeLinks[type].alt, className)}
        >
            <Button>
                <Image css={{ height: "90%", width: "fit-content" }} src={storeLinks[type].image} alt={storeLinks[type].alt} />
            </Button>
        </a>
    );
};

export default StoreLink;
