import { ConditionalLinkProps } from "module/common/component/navigation/ConditionalLink/ConditionalLink.types";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const ConditionalLink = ({ condition, children, ...linkProps }: ConditionalLinkProps): JSX.Element =>
    condition ? <Link {...linkProps}>{children}</Link> : <Fragment>{children}</Fragment>;

export default ConditionalLink;
