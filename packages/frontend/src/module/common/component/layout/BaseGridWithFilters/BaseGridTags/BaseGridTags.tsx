import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import { useRecoilState } from "recoil";

export const BaseGridTags = (): JSX.Element => {
    const [showFilters, setShowFilters] = useRecoilState(filtersVisibilityState);
    return (
        <Row gap="1rem">
            {!showFilters && <Button onClick={() => setShowFilters(true)}>Show filters</Button>}
            <Button appearance="outlined">Clear all</Button>
        </Row>
    );
};
