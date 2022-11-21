import { DropLandingProps } from "module/drop/component/display/DropLanding/DropLanding.types";
import { DropLandingContent, DropLandingRoot } from "module/drop/component/display/DropLanding/DropLanding.styles";
import DropLandingDescriptionSection from "module/drop/component/display/DropLanding/DropLandingDescriptionSection/DropLandingDescriptionSection";
import { useEffect, useRef, useState } from "react";
import DropLandingVideoSection from "module/drop/component/display/DropLanding/DropLandingVideoSection/DropLandingVideoSection";
import DropLandingArtistSection from "module/drop/component/display/DropLanding/DropLandingArtistSection/DropLandingArtistSection";
import { Col, Divider, ThemeOverrideProvider } from "@peersyst/react-components";
import DropLandingNftsSection from "module/drop/component/display/DropLanding/DropLandingNftsSection/DropLandingNftsSection";
import DropLandingFaqsSection from "./DropLandingFaqsSection/DropLandingFaqsSection";

function DropLanding({
    drop: {
        collection: { header, image, name, description, items, user },
        price = "0",
        sold = 0,
        fontColor,
        backgroundColor,
        videoUrl,
        faqs,
    },
    loading = false,
    nfts,
    loadingNfts = false,
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
            <ThemeOverrideProvider
                overrides={(theme) => ({ ...theme, palette: { ...theme.palette, background: backgroundColor, text: fontColor } })}
            >
                <DropLandingContent ref={ref} preview={preview}>
                    <Col>
                        <DropLandingDescriptionSection
                            cover={header}
                            image={image}
                            name={name}
                            description={description}
                            items={items}
                            price={price}
                            sold={sold}
                            loading={loading}
                        />
                        {(loading || videoUrl) && <DropLandingVideoSection videoUrl={videoUrl} loading={loading} />}
                        <DropLandingArtistSection artist={user} loading={loading} />
                    </Col>
                    <Divider css={{ color: fontColor, opacity: 0.4 }} />
                    <DropLandingNftsSection nfts={nfts} loading={loadingNfts} />
                    <DropLandingFaqsSection faqs={faqs} loading={loading} />
                </DropLandingContent>
            </ThemeOverrideProvider>
        </DropLandingRoot>
    );
}

export default DropLanding;
