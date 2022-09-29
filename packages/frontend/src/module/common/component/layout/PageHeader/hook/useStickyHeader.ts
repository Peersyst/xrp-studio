import { useRecoilValue } from "recoil";
import { stickyHeaderState } from "module/common/component/layout/PageHeader/state/PageHeaderState";

export default function (): boolean {
    return useRecoilValue(stickyHeaderState);
}
