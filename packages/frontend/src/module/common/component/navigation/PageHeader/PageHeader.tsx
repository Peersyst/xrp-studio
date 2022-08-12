import { Col, Row } from "@peersyst/react-components";
import React from "react";
import { PageHeaderProps } from "./PageHeader.types";

const PageHeader = ({ bottomComponent }: PageHeaderProps) => {
    return (
        <Col>
            <Row></Row>
            {bottomComponent}
        </Col>
    );
};

export default PageHeader;
