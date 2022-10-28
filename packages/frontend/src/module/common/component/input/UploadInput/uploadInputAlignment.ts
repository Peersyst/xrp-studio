import { CSSProperties } from "react";
import {
    UploadInputLabelHorizontalAlignment,
    UploadInputLabelVerticalAlignment,
} from "module/common/component/input/UploadInput/UploadInput.types";

export const uploadInputAlignItems: Record<UploadInputLabelHorizontalAlignment, CSSProperties["alignItems"]> = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
};

export const uploadInputJustifyContent: Record<UploadInputLabelVerticalAlignment, CSSProperties["justifyContent"]> = {
    top: "flex-start",
    center: "center",
    bottom: "flex-end",
};
