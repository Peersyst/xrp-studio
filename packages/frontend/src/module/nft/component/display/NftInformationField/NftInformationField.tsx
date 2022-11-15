import { NftInformationFieldProps } from "module/nft/component/display/NftInformationField/NftInformationField.types";
import { Typography } from "@peersyst/react-components";

const NftInformationField = ({ title, children }: NftInformationFieldProps): JSX.Element => {
    return (
        <>
            <Typography variant="body1" fontWeight={700}>
                {title}:
            </Typography>
            {children}
        </>
    );
};

export default NftInformationField;
