import { ImageInputProps } from "module/common/component/input/ImageInput/ImageInput.types";

export type CoverInputProps = Omit<ImageInputProps, "children" | "placeholder" | "changeButton">;
