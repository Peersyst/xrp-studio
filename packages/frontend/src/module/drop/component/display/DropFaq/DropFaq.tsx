import { Expandable, Skeleton, Typography, WithLoading } from "@peersyst/react-components";
import { DropFaqProps } from "./DropFaq.types";

const DropFaq = ({ faq, loading = false, ...rest }: WithLoading<DropFaqProps>): JSX.Element => {
    const { answer, question } = faq || {};

    return (
        <Skeleton width="100%" loading={loading}>
            <Expandable {...rest}>
                <Expandable.Display>
                    <Typography variant="h5" fontWeight={500}>
                        {answer}
                    </Typography>
                </Expandable.Display>
                <Expandable.Body>
                    <Expandable.Content>
                        <Typography variant="body2" light fontWeight={500}>
                            {question}
                        </Typography>
                    </Expandable.Content>
                </Expandable.Body>
            </Expandable>
        </Skeleton>
    );
};

export default DropFaq;