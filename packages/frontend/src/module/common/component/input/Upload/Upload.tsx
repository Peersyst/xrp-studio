import Button from "module/common/component/input/Button/Button";
import { UploadRoot, TypographyUpload, ImageUpload } from "module/common/component/input/Upload/Upload.styles";
import { image } from "asset";

const UploadFile = (): JSX.Element => {
    return (
        <UploadRoot gap={40} justifyContent={"center"}>
            <ImageUpload src={image.upload} alt="logo" />
            <TypographyUpload variant={"body2"}> Upload an image, video or audio </TypographyUpload>
            <Button style={{ width: "7.75rem", alignSelf: "center", color: "white" }}>Choose file</Button>
        </UploadRoot>
    );
};

export default UploadFile;
