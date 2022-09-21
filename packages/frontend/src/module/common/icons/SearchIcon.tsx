import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
export default function SearchIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="SearchIcon" className={cx(undefined, "Icon", className)} fill="none">
            <path
                d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#008CFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </SvgIcon>
    );
}
