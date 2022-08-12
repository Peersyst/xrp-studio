import Button from "module/common/component/input/Button/Button";
import { UploadRoot, TypographyUpload } from "module/common/component/input/Upload/Upload.styles";
import { image } from "asset";

const UploadFile = (): JSX.Element => {
    return (
        <UploadRoot gap={15} justifyContent={"center"}>
            <img src={image.logo} alt="logo" />
            <TypographyUpload variant={"body2"}> Upload an image, video or audio </TypographyUpload>
            <Button> Choose file </Button>
        </UploadRoot>
    );
};

export default UploadFile;
