import { DropLandingProps } from "module/drop/component/display/DropLanding/DropLanding.types";
import { DropLandingContent, DropLandingRoot } from "module/drop/component/display/DropLanding/DropLanding.styles";
import DropLandingDescriptionSection from "module/drop/component/display/DropLanding/DropLandingDescriptionSection/DropLandingDescriptionSection";
import { useEffect, useRef, useState } from "react";
import DropLandingVideoSection from "module/drop/component/display/DropLanding/DropLandingVideoSection/DropLandingVideoSection";
import DropLandingArtistSection from "module/drop/component/display/DropLanding/DropLandingArtistSection/DropLandingArtistSection";
import { Col, Divider, ThemeOverrideProvider, WithLoading } from "@peersyst/react-components";
import DropLandingNftsSection from "module/drop/component/display/DropLanding/DropLandingNftsSection/DropLandingNftsSection";
import { UserDto } from "module/api/service";

function DropLanding({
    drop: {
        collection: { header = "", image = "", name = "", description = "", items = 0, user = { address: "" } } = {},
        price = "0",
        sold = 0,
        fontColor = "#FFFFFF",
        backgroundColor = "#000000",
        videoUrl,
    } = {},
    loading = false,
    nfts,
    loadingNfts = false,
    preview = false,
    ...rest
}: WithLoading<DropLandingProps>): JSX.Element {
    const rootRef = useRef<HTMLDivElement>();
    const contentRef = useRef<HTMLDivElement>();
    const [rootWidth, setRooWidth] = useState<number>();
    const [contentHeight, setContentHeight] = useState<number>();

    // Get root width so content can calculate the scale factor
    useEffect(() => {
        if (preview) {
            const rootObserver = new ResizeObserver(handleRootObserver);
            rootRef.current && rootObserver.observe(rootRef.current);
            return () => {
                rootObserver.disconnect();
            };
        } else {
            if (rootWidth !== undefined) setRooWidth(undefined);
        }
    }, [rootRef, preview]);

    // Get content height so root can adjust its own
    useEffect(() => {
        if (preview) {
            const contentObserver = new ResizeObserver(handleContentObserver);
            contentRef.current && contentObserver.observe(contentRef.current);
            return () => {
                contentObserver.disconnect();
            };
        } else {
            if (contentHeight !== undefined) setContentHeight(undefined);
        }
    }, [rootRef, preview]);

    const handleRootObserver = (entries: ResizeObserverEntry[]) => {
        const child = entries[0];
        const { width: newWidth } = child.target.getBoundingClientRect();
        if (newWidth !== rootWidth) setRooWidth(newWidth);
    };

    const handleContentObserver = (entries: ResizeObserverEntry[]) => {
        const child = entries[0];
        const { height: newHeight } = child.target.getBoundingClientRect();
        if (newHeight !== contentHeight) setContentHeight(newHeight);
    };

    return (
        <DropLandingRoot ref={rootRef} preview={preview} style={{ height: contentHeight, color: fontColor, backgroundColor }} {...rest}>
            <ThemeOverrideProvider
                overrides={(theme) => ({ ...theme, palette: { ...theme.palette, background: backgroundColor, text: fontColor } })}
            >
                <DropLandingContent
                    ref={contentRef}
                    preview={preview}
                    style={{
                        transform:
                            preview && rootWidth !== undefined ? `scale(${rootWidth / document.documentElement.clientWidth})` : undefined,
                    }}
                >
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
                        <DropLandingArtistSection artist={user as UserDto} loading={loading} />
                    </Col>
                    <Divider css={{ color: fontColor, opacity: 0.4 }} />
                    <DropLandingNftsSection nfts={nfts} loading={loadingNfts} />
                </DropLandingContent>
            </ThemeOverrideProvider>
        </DropLandingRoot>
    );
}

export default DropLanding;
