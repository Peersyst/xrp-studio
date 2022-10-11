import { Col, Row } from "@peersyst/react-components";
import EditableAvatar from "module/common/component/input/EditableAvatar/EditableAvatar";
import EditableImage from "module/common/component/input/EditableImage/EditableImage";
import useGetUser from "module/user/query/useGetUser";
import useWallet from "module/wallet/component/hooks/useWallet";
import { EditCoverImage } from "./EditProfileDialogModalHeader.styles";

const EditProfileDialogModalHeader = (): JSX.Element => {
    const { address = "rhqTdSsJAaEReRsR27YzddqyGoWTNMhEvC" } = useWallet();
    const { data: user, isLoading } = useGetUser(address);
    const { image = "", header = "" } = user || {};

    return (
        <Col alignItems="center">
            <Row css={{ position: "relative", width: "100%" }}>
                <EditableImage updating={false}>
                    <EditCoverImage src={header} alt={""} loading={isLoading} />
                </EditableImage>
            </Row>
            <EditableAvatar img={image} alt={""} loading={isLoading} css={{ objectFit: "contain", marginTop: "-5rem", zIndex: "2" }} />
            <Col css={{ padding: "1.5rem" }} gap="1rem"></Col>
        </Col>
    );
};

export default EditProfileDialogModalHeader;
