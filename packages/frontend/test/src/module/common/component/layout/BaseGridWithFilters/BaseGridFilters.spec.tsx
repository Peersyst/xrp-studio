import BaseGridFilters from "module/common/component/layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters";
import { render } from "test-utils";

describe("BaseGridFilters test", () => {
    test("Renders correctly", () => {
        const screen = render(
            <BaseGridFilters>
                <div>test</div>
            </BaseGridFilters>,
        );
    });
});
