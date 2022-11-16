import { DropLandingProps } from "module/drop/component/display/DropLanding/DropLanding.types";
import { DropLandingContent, DropLandingRoot } from "module/drop/component/display/DropLanding/DropLanding.styles";
import DropLandingDescriptionSection from "module/drop/component/display/DropLanding/DropLandingDescriptionSection/DropLandingDescriptionSection";
import { getLuminance } from "@peersyst/react-utils";
import { useEffect, useRef, useState } from "react";

function DropLanding({
    drop: {
        collection: { header, image, name, description, items },
        price = "0",
        sold = 0,
        fontColor,
        backgroundColor,
    },
    loading = false,
    preview = false,
    ...rest
}: DropLandingProps): JSX.Element {
    const ref = useRef<HTMLDivElement>();
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();

    // Get content sizes so root can adapt to content scaling when preview is true.
    useEffect(() => {
        if (preview) {
            const observer = new ResizeObserver(handleObserver);
            ref.current && observer.observe(ref.current);
            return () => {
                observer.disconnect();
            };
        } else {
            if (width !== undefined) setWidth(undefined);
            if (height !== undefined) setHeight(undefined);
        }
    }, [ref, preview]);

    const handleObserver = (entries: ResizeObserverEntry[]) => {
        const child = entries[0];
        const { width: newWidth, height: newHeight } = child.target.getBoundingClientRect();
        if (newWidth !== width) setWidth(newWidth);
        if (newHeight !== height) setHeight(newHeight);
    };

    return (
        <DropLandingRoot style={{ height, width, color: fontColor, backgroundColor }} {...rest}>
            <DropLandingContent ref={ref} preview={preview}>
                <DropLandingDescriptionSection
                    cover={header}
                    image={image}
                    name={name}
                    description={description}
                    items={items}
                    price={price}
                    sold={sold}
                    fontLuminance={getLuminance(fontColor)}
                    loading={loading}
                />
            </DropLandingContent>
        </DropLandingRoot>
    );
}

export default DropLanding;
