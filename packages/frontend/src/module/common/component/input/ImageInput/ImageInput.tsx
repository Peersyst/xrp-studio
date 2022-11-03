import { ImageInputProps } from "module/common/component/input/ImageInput/ImageInput.types";
import { Image } from "@peersyst/react-components";
import { ImageInputRoot } from "module/common/component/input/ImageInput/ImageInput.styles";

const ImageInput = ({ children, placeholder, alt, loading = false, ...rest }: ImageInputProps): JSX.Element => {
    return (
        <ImageInputRoot fileTypes="image/*" uploadPath="image" loading={loading} placeholder={placeholder} {...rest}>
            {children || ((url) => <Image src={url} alt={alt} loading={loading} className="image-input-img" />)}
        </ImageInputRoot>
    );
};

export default ImageInput;
