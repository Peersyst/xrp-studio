import { Typography, TypographyProps } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";

export type NftNameProps = Omit<TypographyProps, "children"> & {
    name?: string;
};

function NftName({ name, ...rest }: NftNameProps): JSX.Element {
    const translate = useTranslate();
    return name ? (
        <Typography {...rest}>{name}</Typography>
    ) : (
        <Typography {...rest} fontStyle="italic">
            {translate("none", { context: "male" })}
        </Typography>
    );
}

export default NftName;
