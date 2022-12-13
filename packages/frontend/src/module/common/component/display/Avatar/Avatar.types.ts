import { ExtendableHexagonProps } from "module/common/component/display/Hexagon/Hexagon.types";

export interface AvatarProps extends ExtendableHexagonProps {
    img: string | undefined;
    alt: string;
    fallback?: string;
}
