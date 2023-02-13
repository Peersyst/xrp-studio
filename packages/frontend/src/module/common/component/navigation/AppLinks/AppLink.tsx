import { Image } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import { cx } from "@peersyst/react-utils";
import { AppLinkProps } from "./AppLinks.types";

const AppLink = ({ img, link, alt }: AppLinkProps): JSX.Element => {
    return (
        <a href={link} target="_blank" rel="noreferrer" className={cx("app-link", alt)} css={{ flex: 1 }}>
            <Button size="lg" fullWidth variant="secondary">
                <Image css={{ height: "2.5rem", width: "inherit" }} src={img} alt={alt} />
            </Button>
        </a>
    );
};

export default AppLink;
