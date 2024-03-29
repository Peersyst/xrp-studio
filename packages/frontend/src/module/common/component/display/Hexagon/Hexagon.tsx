import { Skeleton } from "@peersyst/react-components";
import { Children } from "react";
import { cx } from "@peersyst/react-utils";
import { HexagonProps, HexagonSize, HexagonSizeParams } from "module/common/component/display/Hexagon/Hexagon.types";
import { HexagonRoot } from "./Hexagon.styles";

const HEXAGON_SIZES: Record<HexagonSize, HexagonSizeParams> = {
    xl: {
        width: 216,
        height: 192,
        d: "M209.199 90.001L209.199 90.0009L168.437 15.9916L168.437 15.9914C164.352 8.57561 156.464 4 147.937 4L68.0632 4C59.5361 4 51.648 8.57551 47.5634 15.9916L6.80087 90.0009L10.3023 91.9294L6.80085 90.0009C2.85442 97.1663 3.09336 105.848 7.42292 112.793L7.42293 112.793L47.4966 177.069L47.4967 177.069C51.7451 183.883 59.2886 188 67.3742 188H148.625C156.711 188 164.255 183.883 168.503 177.069C168.503 177.069 168.503 177.069 168.503 177.069L208.577 112.793L205.183 110.677L208.577 112.793C212.907 105.848 213.145 97.1663 209.199 90.001Z",
        strokeWidth: 8,
    },
    lg: {
        width: 192,
        height: 170,
        d: "M186.552 79.8968L186.552 79.8967L149.866 13.4566L149.866 13.4564C146.296 6.99118 139.4 3 131.943 3L60.0569 3C52.6 3 45.7042 6.99111 42.1342 13.4566L5.44789 79.8967L5.44788 79.8967C1.99882 86.1432 2.20758 93.7114 5.99158 99.7655L5.9916 99.7656L42.0579 157.468L44.6019 155.878L42.058 157.468C45.7713 163.409 52.3661 167 59.4368 167H132.563C139.634 167 146.229 163.409 149.942 157.468L186.008 99.7656L183.464 98.1755L186.008 99.7656C189.793 93.7113 190.001 86.1432 186.552 79.8968Z",
        strokeWidth: 6,
    },
    md: {
        width: 108,
        height: 96,
        d: "M104.6 45.0005L104.6 45.0004L84.2185 7.99581L84.2184 7.99569C82.1758 4.2878 78.2321 2 73.9685 2L34.0316 2C29.768 2 25.824 4.28775 23.7817 7.9958L25.5026 8.94365L23.7817 7.99581L3.40044 45.0004L5.15114 45.9647L3.40043 45.0005C1.42721 48.5832 1.54668 52.9241 3.71146 56.3964L3.71147 56.3964L23.7483 88.5346L23.7483 88.5346C25.8726 91.9416 29.6443 94 33.6871 94H74.3127C78.3557 94 82.1276 91.9416 84.2516 88.5345L104.289 56.3964L102.591 55.3383L104.289 56.3964C106.453 52.9241 106.573 48.5831 104.6 45.0005Z",
        strokeWidth: 4,
    },
    sm: {
        width: 32,
        height: 28,
        d: "M31.6313 13.3526C32.1507 14.2904 32.1195 15.4254 31.5492 16.3349L25.1374 26.5607C24.577 27.4545 23.5775 28 22.5001 28H9.49987C8.42252 28 7.42302 27.4545 6.86255 26.5607L0.450764 16.3349C-0.119502 15.4254 -0.150722 14.2904 0.368734 13.3526L6.89074 1.5784C7.42922 0.606281 8.47376 -4.8254e-08 9.61011 0L22.3899 5.42684e-07C23.5262 5.90939e-07 24.5707 0.606282 25.1093 1.5784L31.6313 13.3526Z",
    },
};

/**
 * Hexagon component that clips content
 * [WARNING]: Do not use elements with position: "relative" inside, as it will break clipping on Safari.
 */
const Hexagon = ({ size = "lg", loading = false, className, style, children }: HexagonProps): JSX.Element => {
    const { width, height, strokeWidth = 0, d } = HEXAGON_SIZES[size];

    // Uses Math.random as it may be enough to generate a unique id for a few Hexagons. Can be changed if necessary
    const id = `hexagon-${size}-${Math.random()}`;

    const remWidth = `${width / 16}rem`;
    const remHeight = `${height / 16}rem`;

    return (
        <HexagonRoot
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={cx("avatar", className)}
            style={{ ...style, width: remWidth, height: `${height}px` }}
        >
            <clipPath id={id}>
                <path d={d} />
            </clipPath>
            <foreignObject y="0" x="0" width={width} height={height} style={{ clipPath: `url(#${id})` }}>
                <div style={{ width: "100%", height: "100%" }}>
                    <Skeleton width={remWidth} height={remHeight} loading={loading}>
                        {Children.only(children)}
                    </Skeleton>
                </div>
            </foreignObject>
            <path d={d} {...(strokeWidth ? { stroke: "white", strokeWidth } : {})} />
        </HexagonRoot>
    );
};

export default Hexagon;
