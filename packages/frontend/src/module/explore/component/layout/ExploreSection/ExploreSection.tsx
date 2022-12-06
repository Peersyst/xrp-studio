import { ExploreSectionProps } from "module/explore/component/layout/ExploreSection/ExploreSection.types";
import { Col, Row, Skeleton, Typography } from "@peersyst/react-components";
import Link from "module/common/component/navigation/Link/Link";
import useTranslate from "module/common/hook/useTranslate";

const ExploreSection = ({ title, viewMoreLink, loading, children, ...rest }: ExploreSectionProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <Col gap="1.5rem" {...rest}>
            <Skeleton loading={loading}>
                <Row gap={"1.5rem"} alignItems="baseline">
                    <Typography variant="h3" fontWeight={800}>
                        {title}
                    </Typography>
                    {viewMoreLink && (
                        <Link to={viewMoreLink} variant="h6" fontWeight={500} type="router" color="primary">
                            {translate("viewAll")}
                        </Link>
                    )}
                </Row>
            </Skeleton>
            {children}
        </Col>
    );
};

export default ExploreSection;
