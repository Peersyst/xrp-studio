import { CoverInputProps } from "module/common/component/input/CoverInput/CoverInput.types";
import ImageInput from "module/common/component/input/ImageInput/ImageInput";
import useTranslate from "module/common/hook/useTranslate";

const CoverInput = ({ placeholderVariant, ...rest }: CoverInputProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <ImageInput
            placeholder={{
                type: "compact",
                label: translate("changeFile"),
                alignment: { vertical: "top", horizontal: "center" },
                variant: placeholderVariant,
            }}
            changeButton={{ label: translate("change"), alignment: { vertical: "top", horizontal: "right" } }}
            multiple={false}
            {...rest}
        />
    );
};

export default CoverInput;
