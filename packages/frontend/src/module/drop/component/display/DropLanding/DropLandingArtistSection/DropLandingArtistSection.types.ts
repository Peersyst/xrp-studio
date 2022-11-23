import { UserDto } from "module/api/service";
import { CSSProperties } from "react";

export interface DropLandingArtistSectionProps {
    artist: UserDto | undefined;
    className?: string;
    style?: CSSProperties;
}

export interface DropLandingArtistSectionDescriptionProps {
    description: string | undefined;
    loading?: boolean;
}
