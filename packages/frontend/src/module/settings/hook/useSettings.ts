import { useRecoilValue } from "recoil";
import { settingsState } from "../SettingsState";

export default () => {
    return useRecoilValue(settingsState);
};
