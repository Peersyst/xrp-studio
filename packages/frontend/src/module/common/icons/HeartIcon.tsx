import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
export default function HeartIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="HeartIcon" className={cx(undefined, "Icon", className)} fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9924 3.63471C9.79315 0.751311 6.12571 -0.0243137 3.37016 2.616C0.614606 5.25634 0.226669 9.67081 2.39061 12.7935C4.1898 15.3899 9.63474 20.8658 11.4193 22.6381C11.6189 22.8362 11.7188 22.9354 11.8352 22.9745C11.9368 23.0085 12.048 23.0085 12.1497 22.9745C12.2661 22.9354 12.3659 22.8362 12.5656 22.6381C14.3501 20.8658 19.7951 15.3899 21.5943 12.7935C23.7583 9.67081 23.4177 5.22856 20.6147 2.616C17.8118 0.00346037 14.1917 0.751311 11.9924 3.63471Z"
                stroke="#777F86"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </SvgIcon>
    );
}
