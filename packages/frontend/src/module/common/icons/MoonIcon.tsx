import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";

export default function MoonIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="MoonIcon" className={cx(undefined, "Icon", className)} fill="none">
            <path
                d="M25 14.1234C23.344 17.0283 20.2184 18.9868 16.6353 18.9868C11.3214 18.9868 7.01358 14.679 7.01358 9.36508C7.01358 5.78175 8.97241 2.65593 11.8777 1C5.77447 1.57868 1 6.71824 1 12.9729C1 19.6154 6.38474 25.0001 13.0272 25.0001C19.2815 25.0001 24.4209 20.2261 25 14.1234Z"
                stroke="#008CFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </SvgIcon>
    );
}
