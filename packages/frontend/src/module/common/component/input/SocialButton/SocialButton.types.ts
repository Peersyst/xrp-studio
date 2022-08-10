import { ButtonProps } from "@peersyst/react-components";

export type Platform = "twitter" | "instagram" | "share";

export interface SocialButtonProps extends ButtonProps {
    platform: Platform;
    user: string;
}
