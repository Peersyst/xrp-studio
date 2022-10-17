import { RenderResult, screen } from "@testing-library/react";
import Carousel from "module/common/component/display/Carousel/Carousel";
import { render } from "test-utils";

interface RenderCarouselOptions {
    loading?: boolean;
}

const renderCarousel = ({ loading = false }: RenderCarouselOptions = {}): RenderResult => {
    return render(
        <Carousel loading={loading} Skeleton={() => <p>Skeleton</p>} skeletonCount={3}>
            <p>a</p>
            <p>b</p>
            <p>c</p>
        </Carousel>,
    );
};

describe("Carousel", () => {
    test("Renders correctly", () => {
        renderCarousel();

        expect(screen.getByText("a")).toBeInTheDocument();
        expect(screen.getByText("b")).toBeInTheDocument();
        expect(screen.getByText("c")).toBeInTheDocument();
    });

    test("Renders correctly when loading", () => {
        renderCarousel({ loading: true });

        expect(screen.queryByText("a")).toBeNull();
        expect(screen.queryByText("b")).toBeNull();
        expect(screen.queryByText("c")).toBeNull();

        expect(screen.getAllByText("Skeleton")).toHaveLength(3);
    });
});
