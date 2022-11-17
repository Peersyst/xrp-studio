import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
export default function XrpIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="XrpIcon" className={cx(undefined, "Icon", className)} fill="none">
            <path
                d="M19.0712 3H21.9636L15.9435 9.16455C13.7638 11.3971 10.2337 11.3971 8.05407 9.16455L2.03637 3H4.92884L9.50152 7.68359C10.8593 9.08105 13.0801 9.09824 14.4597 7.72288C14.4718 7.7106 14.4864 7.69587 14.4985 7.68359L19.0712 3ZM4.89247 20.1429H2L8.05649 13.939C10.2361 11.7065 13.7663 11.7065 15.9459 13.939L22 20.1429H19.1075L14.4985 15.4224C13.1407 14.025 10.9199 14.0078 9.54031 15.3831C9.52819 15.3954 9.51364 15.4102 9.50152 15.4224L4.89247 20.1429Z"
                fill="white"
            />
        </SvgIcon>
    );
}
