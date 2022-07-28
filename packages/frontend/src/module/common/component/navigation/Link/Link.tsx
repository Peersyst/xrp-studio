import { Link as RouterLink } from "react-router-dom";
import { LinkProps } from "module/common/component/navigation/Link/Link.types";
import { LinkRoot } from "./Link.styles";
import { Typography } from "@peersyst/react-components";

const Link = ({ to, type = "href", target = "_self", children, variant = "body2", style, className, ...rest }: LinkProps): JSX.Element => {
    const { LinkComponent, hrefProp } =
        type === "href"
            ? { LinkComponent: "a", hrefProp: { href: to, target } }
            : {
                  LinkComponent: RouterLink,
                  hrefProp: { to },
              };

    return (
        <LinkRoot as={LinkComponent} {...(hrefProp as { to: string; target?: string })} style={style} className={className}>
            <Typography variant={variant} singleLine {...rest}>
                {children}
            </Typography>
        </LinkRoot>
    );
};

export default Link;
