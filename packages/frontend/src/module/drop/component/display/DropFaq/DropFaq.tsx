import { Expandable, Skeleton, Typography, WithLoading } from "@peersyst/react-components";
import { DropFaqProps } from "./DropFaq.types";

const DropFaq = ({ faq, loading = false, ...rest }: WithLoading<DropFaqProps>): JSX.Element => {
    return (
        <Expandable {...rest}>
            <Expandable.Display>
                <Skeleton loading={loading} width="100%">
                    <Typography variant="h5" fontWeight={500}>
                        {faq!.answer}
                    </Typography>
                </Skeleton>
            </Expandable.Display>
            <Expandable.Body>
                <Expandable.Content>
                    <Skeleton loading={loading} width="100%">
                        <Typography variant="body2" light fontWeight={500}>
                            {faq!.question}
                        </Typography>
                    </Skeleton>
                </Expandable.Content>
            </Expandable.Body>
        </Expandable>
    );
};

export default DropFaq;
