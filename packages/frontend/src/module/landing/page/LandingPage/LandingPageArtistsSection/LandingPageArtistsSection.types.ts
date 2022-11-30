import { UserDto } from "module/api/service";
import { CSSProperties } from "react";

export interface LandingPageArtistsSectionProps {
    artists: UserDto[] | undefined;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
}
