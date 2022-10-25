import UploadInput from "module/common/component/input/UploadInput/UploadInput";
import { ImageInputProps } from "module/common/component/input/ImageInput/ImageInput.types";
import { Image } from "@peersyst/react-components";

const ImageInput = ({ children, alt, loading = false, ...rest }: ImageInputProps): JSX.Element => {
    return (
        <UploadInput fileTypes="image/*" uploadPath="image" loading={loading} {...rest}>
            {(url) => (children ? children(url) : <Image src={url} alt={alt} loading={loading} className="image-input-img" />)}
        </UploadInput>
    );
};

export default ImageInput;
