import { renderHook, translate } from "test-utils";
import useBaseNftPagePlaceholders, {
    UseBaseNftPlaceholderOptions,
} from "module/nft/component/layout/BaseNftPage/hook/useBaseNftPagePlaceholders";

const renderUseBaseNftPagePlaceholders = (options: UseBaseNftPlaceholderOptions = {}) =>
    renderHook(() => {
        return useBaseNftPagePlaceholders(options);
    });

describe("useBaseNftPagePlaceholders", () => {
    test("Returns readonly placeholders", () => {
        const { result } = renderUseBaseNftPagePlaceholders({ readonly: true });
        expect(result.current).toEqual({
            collectionPlaceholder: translate("noCollectionPlaceholder"),
        });
    });

    test("Returns non-readonly placeholders", () => {
        const { result } = renderUseBaseNftPagePlaceholders();
        expect(result.current).toEqual({
            namePlaceholder: translate("namePlaceholder"),
            descriptionPlaceholder: translate("descriptionPlaceholder"),
            collectionPlaceholder: translate("collectionPlaceholder"),
            externalLinkPlaceholder: translate("externalLinkPlaceholder"),
            backgroundColorPlaceholder: translate("backgroundColorPlaceholder"),
        });
    });
});
