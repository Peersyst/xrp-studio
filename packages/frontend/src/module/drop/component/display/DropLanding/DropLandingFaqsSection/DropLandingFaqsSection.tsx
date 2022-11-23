import { Col, Skeleton, Typography, WithLoading } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { DropLandingFaqsSectionProps } from "./DropLandingFaqsSection.types";
import { DropLandingFaqsSectionRoot } from "./DropLandingFaqsSection.styles";
import DropFaq from "../../DropFaq/DropFaq";
import { DropFaqSkeleton } from "module/common/component/feedback/Skeletons/Skeletons";

const DropLandingFaqsSection = ({ faqs = [], loading, ...rest }: WithLoading<DropLandingFaqsSectionProps>): JSX.Element => {
    const translate = useTranslate();
    return (
        <DropLandingFaqsSectionRoot as={Col} gap="1.5rem" {...rest}>
            <Skeleton loading={loading}>
                <Typography variant="h3" fontWeight={800}>
                    {translate("FAQs")}
                </Typography>
            </Skeleton>
            <Col gap="1rem" alignItems="center">
                {loading ? (
                    <DropFaqSkeleton count={2} />
                ) : (
                    faqs.map((faq, index) => {
                        return (
                            <Skeleton loading={loading} width="100%">
                                <DropFaq key={index} faq={faq} loading={loading} />
                            </Skeleton>
                        );
                    })
                )}
            </Col>
        </DropLandingFaqsSectionRoot>
    );
};

export default DropLandingFaqsSection;
