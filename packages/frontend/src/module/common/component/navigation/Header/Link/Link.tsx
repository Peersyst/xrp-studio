import { Link as RouterLink } from "react-router-dom";
import { LinkRoot, TypographyRoot } from "./Link.styles";
import { LinkProps } from "module/common/component/navigation/Header/Link/Link.types";

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
            <TypographyRoot variant={variant} singleLine {...rest}>
                {children}
            </TypographyRoot>
        </LinkRoot>
    );
};

export default Link;
