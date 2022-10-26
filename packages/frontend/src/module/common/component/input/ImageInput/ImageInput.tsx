import UploadInput from "module/common/component/input/UploadInput/UploadInput";
import { ImageInputProps } from "module/common/component/input/ImageInput/ImageInput.types";
import { ImageInputDisplay } from "module/common/component/input/ImageInput/ImageInput.styles";

const ImageInput = ({ children: { display, placeholder } = {}, alt, loading = false, ...rest }: ImageInputProps): JSX.Element => {
    return (
        <UploadInput fileTypes="image/*" uploadPath="image" loading={loading} {...rest}>
            {{
                display: display || ((url) => <ImageInputDisplay src={url} alt={alt} loading={loading} className="image-input-img" />),
                placeholder,
            }}
        </UploadInput>
    );
};

export default ImageInput;
