import { CoverInputProps } from "module/common/component/input/CoverInput/CoverInput.types";
import ImageInput from "module/common/component/input/ImageInput/ImageInput";
import useTranslate from "module/common/hook/useTranslate";

const CoverInput = (props: CoverInputProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <ImageInput
            placeholder={{ type: "compact", label: translate("changeFile"), alignment: { vertical: "top", horizontal: "center" } }}
            changeButton={{ label: translate("change"), alignment: { vertical: "top", horizontal: "right" } }}
            {...props}
        />
    );
};

export default CoverInput;
