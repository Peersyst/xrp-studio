import { setRef } from "@peersyst/react-utils";
import { ConditionalLinkProps } from "module/common/component/navigation/ConditionalLink/ConditionalLink.types";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

const ConditionalLink = forwardRef(
    ({ condition, children, style, className, ...linkProps }: ConditionalLinkProps, ref): JSX.Element =>
        condition ? (
            <Link ref={(r) => setRef(ref, r)} css={{ display: "flex" }} style={style} className={className} {...linkProps}>
                {children}
            </Link>
        ) : (
            <span ref={(r) => setRef(ref, r)} css={{ display: "flex" }} style={style} className={className}>
                {children}
            </span>
        ),
);

export default ConditionalLink;
