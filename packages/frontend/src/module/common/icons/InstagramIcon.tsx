import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
export default function InstagramIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="InstagramIcon" className={cx(undefined, "Icon", className)} fill="none">
            <path
                d="M12 2.16221C15.2041 2.16221 15.5836 2.1744 16.849 2.23213C18.019 2.28553 18.6544 2.48102 19.0773 2.64531C19.6373 2.863 20.0371 3.12308 20.457 3.54297C20.8769 3.96287 21.137 4.36266 21.3546 4.92274C21.519 5.34564 21.7145 5.98103 21.7679 7.15097C21.8256 8.41637 21.8378 8.79587 21.8378 12C21.8378 15.2042 21.8256 15.5837 21.7679 16.849C21.7145 18.019 21.519 18.6544 21.3546 19.0773C21.137 19.6374 20.8769 20.0372 20.457 20.4571C20.0371 20.877 19.6373 21.137 19.0773 21.3547C18.6544 21.519 18.019 21.7145 16.849 21.7679C15.5838 21.8256 15.2043 21.8378 12 21.8378C8.79563 21.8378 8.41613 21.8256 7.15097 21.7679C5.98098 21.7145 5.34559 21.519 4.92274 21.3547C4.36261 21.137 3.96282 20.877 3.54293 20.4571C3.12303 20.0372 2.86295 19.6374 2.64531 19.0773C2.48097 18.6544 2.28548 18.019 2.23209 16.8491C2.17435 15.5837 2.16216 15.2042 2.16216 12C2.16216 8.79587 2.17435 8.41637 2.23209 7.15102C2.28548 5.98103 2.48097 5.34564 2.64531 4.92274C2.86295 4.36266 3.12303 3.96287 3.54293 3.54297C3.96282 3.12308 4.36261 2.863 4.92274 2.64531C5.34559 2.48102 5.98098 2.28553 7.15092 2.23213C8.41632 2.1744 8.79582 2.16221 12 2.16221ZM12 0C8.74095 0 8.33234 0.0138139 7.05242 0.0722133C5.77511 0.130517 4.90283 0.333343 4.1395 0.630008C3.35039 0.936676 2.68118 1.347 2.01406 2.01411C1.34695 2.68123 0.936629 3.35044 0.629961 4.13954C0.333296 4.90288 0.13047 5.77516 0.0721656 7.05246C0.0137662 8.33234 0 8.741 0 12C0 15.2591 0.0137662 15.6677 0.0721656 16.9476C0.13047 18.2249 0.333296 19.0972 0.629961 19.8605C0.936629 20.6496 1.34695 21.3188 2.01406 21.9859C2.68118 22.6531 3.35039 23.0634 4.1395 23.37C4.90283 23.6667 5.77511 23.8695 7.05242 23.9278C8.33234 23.9862 8.74095 24 12 24C15.259 24 15.6677 23.9862 16.9475 23.9278C18.2248 23.8695 19.0971 23.6667 19.8605 23.37C20.6496 23.0634 21.3188 22.6531 21.9859 21.9859C22.653 21.3188 23.0633 20.6496 23.37 19.8605C23.6667 19.0972 23.8695 18.2249 23.9278 16.9476C23.9862 15.6677 24 15.2591 24 12C24 8.741 23.9862 8.33234 23.9278 7.05246C23.8695 5.77516 23.6667 4.90288 23.37 4.13954C23.0633 3.35044 22.653 2.68123 21.9859 2.01411C21.3188 1.347 20.6496 0.936676 19.8605 0.630008C19.0971 0.333343 18.2248 0.130517 16.9475 0.0722133C15.6677 0.0138139 15.259 0 12 0ZM12 5.83784C8.59671 5.83784 5.83779 8.59676 5.83779 12C5.83779 15.4033 8.59671 18.1622 12 18.1622C15.4032 18.1622 18.1622 15.4033 18.1622 12C18.1622 8.59676 15.4032 5.83784 12 5.83784ZM12 16C9.79085 16 7.99995 14.2091 7.99995 12C7.99995 9.7909 9.79085 8 12 8C14.2091 8 16 9.7909 16 12C16 14.2091 14.2091 16 12 16ZM19.8456 5.59438C19.8456 6.38968 19.2009 7.03441 18.4056 7.03441C17.6103 7.03441 16.9656 6.38968 16.9656 5.59438C16.9656 4.79909 17.6103 4.15441 18.4056 4.15441C19.2009 4.15441 19.8456 4.79909 19.8456 5.59438Z"
                fill="white"
            />
        </SvgIcon>
    );
}