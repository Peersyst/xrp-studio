import { DropLandingProps } from "module/drop/component/display/DropLanding/DropLanding.types";
import { DropLandingContent, DropLandingRoot } from "module/drop/component/display/DropLanding/DropLanding.styles";
import { Drop } from "module/drop/util/Drop";
import DropLandingDescriptionSection from "module/drop/component/display/DropLanding/DropLandingDescriptionSection/DropLandingDescriptionSection";
import { getLuminance } from "@peersyst/react-utils";
import { useEffect, useRef, useState } from "react";

function DropLanding<P extends boolean = false>({
    drop: dropDtoOrPreview,
    loading = false,
    preview = false as P,
    ...rest
}: DropLandingProps<P>): JSX.Element {
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

    const { cover, image, name, description, items, sold, price, fontColor, backgroundColor } = new Drop(dropDtoOrPreview);

    return (
        <DropLandingRoot style={{ height, width, color: fontColor, backgroundColor }} {...rest}>
            <DropLandingContent ref={ref} preview={preview}>
                <DropLandingDescriptionSection
                    cover={cover}
                    image={image}
                    name={name}
                    description={description}
                    items={items}
                    sold={sold}
                    sales={(BigInt(price) * BigInt(items)).toString()}
                    fontLuminance={getLuminance(fontColor)}
                    loading={loading}
                />
            </DropLandingContent>
        </DropLandingRoot>
    );
}

export default DropLanding;
