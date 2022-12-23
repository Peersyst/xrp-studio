import { Row } from "@peersyst/react-components";
import Link from "../../navigation/Link/Link";
import { ShareButtonPopoverProps } from "./ShareButton.types";

export const ShareButtonPopover = ({ options }: ShareButtonPopoverProps): JSX.Element => {
    return (
        <>
            {options.map((option) => (
                <Row css={{ padding: "0.25rem 0.35rem" }}>
                    <Link to={option.url!} target="_blank">
                        {option.title}
                    </Link>
                </Row>
            ))}
        </>
    );
};

export default ShareButtonPopover;
