import { Col, Expandable, Skeleton, Typography, WithLoading } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { DropLandingFaqsSectionProps } from "./DropLandingFaqsSection.types";
import { DropLandingFaqsSectionRoot } from "./DropLandingFaqsSection.styles";

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
                {faqs.map((faq, index) => {
                    return (
                        <Expandable key={index}>
                            <Expandable.Display>
                                <Typography variant="h5" fontWeight={500}>
                                    {faq.answer}
                                </Typography>
                            </Expandable.Display>
                            <Expandable.Body>
                                <Expandable.Content>
                                    <Typography variant="body2" light fontWeight={500}>
                                        {faq.question}
                                    </Typography>
                                </Expandable.Content>
                            </Expandable.Body>
                        </Expandable>
                    );
                })}
            </Col>
        </DropLandingFaqsSectionRoot>
    );
};

export default DropLandingFaqsSection;
