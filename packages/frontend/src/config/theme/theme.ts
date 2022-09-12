import { createTheme } from "@peersyst/react-components";
import { CopyIcon } from "icons";

// Common theme fields
const theme = createTheme({
    icons: { copy: CopyIcon },
    borderRadius: "0.375rem",
    borderRadiusMd: "0.5rem",
    borderRadiusLg: "0.75rem",
});

export default theme;
