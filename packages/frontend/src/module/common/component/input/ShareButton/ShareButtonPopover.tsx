import Link from "../../navigation/Link/Link";
import { ShareButtonPopoverProps } from "./ShareButton.types";

export const ShareButtonPopover = ({ options }: ShareButtonPopoverProps): JSX.Element => {
    return (
        <>
            {options.map((option) => (
                <Link to={option.url!} target="_blank" css={{ padding: "0.5rem" }}>
                    {option.title}
                </Link>
            ))}
        </>
    );
};

export default ShareButtonPopover;
