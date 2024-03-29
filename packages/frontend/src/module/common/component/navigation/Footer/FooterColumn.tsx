import { FooterItem } from "./Footer.types";
import useTranslate from "module/common/hook/useTranslate";

import { Col, Typography } from "@peersyst/react-components";
import { HeartIcon } from "icons";
import { Fragment } from "react";

interface FooterColProps {
    links: FooterItem[];
}

const FooterColumn = ({ links }: FooterColProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <Col gap={"1rem"}>
            {links.map((item, index) => (
                <Fragment key={index}>
                    {item.link === "" ? (
                        <Typography variant="body2" light>
                            {translate(`${item.label}`)}
                            <HeartIcon css={{ margin: "0rem 0.5rem" }} />
                            {translate(`inBarcelona`)}
                        </Typography>
                    ) : (
                        <a target="_blank" href={item.link} rel="noreferrer">
                            <Typography variant="body2" light>
                                {translate(`${item.label}`)}
                            </Typography>
                        </a>
                    )}
                </Fragment>
            ))}
        </Col>
    );
};

export default FooterColumn;
