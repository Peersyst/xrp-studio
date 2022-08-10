import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
export function CloseIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...props} data-testid="CloseIcon">
            <path d="M18 6L6 18M6 6L18 18" stroke="#141A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </SvgIcon>
    );
}
