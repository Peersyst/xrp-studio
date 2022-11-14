import { ImageInputProps } from "module/common/component/input/ImageInput/ImageInput.types";
import { Image } from "@peersyst/react-components";
import { ImageInputRoot } from "module/common/component/input/ImageInput/ImageInput.styles";

function ImageInput<Multiple extends boolean = false>({
    children,
    placeholder,
    alt,
    loading = false,
    ...rest
}: ImageInputProps<Multiple>): JSX.Element {
    const renderChildren = (val: string | string[]) =>
        Array.isArray(val) ? (
            <>
                {val.map((url, i) => (
                    <Image key={i} src={url} alt={alt + i} loading={loading} className="image-input-img" />
                ))}
            </>
        ) : (
            <Image src={val} alt={alt} loading={loading} className="image-input-img" />
        );

    return (
        // @ts-ignore Can't pass down Multiple type to UploadInput as styled Higher Order Component breaks generic types. However, type is secured by ImageInput's Multiple type
        <ImageInputRoot fileTypes="image/*" uploadPath="image" loading={loading} placeholder={placeholder} {...rest}>
            {children || renderChildren}
        </ImageInputRoot>
    );
}

export default ImageInput;
