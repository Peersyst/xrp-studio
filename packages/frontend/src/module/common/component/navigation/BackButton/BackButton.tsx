import { cx } from "@peersyst/react-utils";
import { DashboardRoutes } from "module/dashboard/DashboardRouter";
import { useNavigate } from "react-router-dom";
import { BackButtonRoot } from "./BackButton.styles";
import { BackButtonOnClick, BackButtonProps } from "./BackButton.types";

const BackButton = ({ className, style, ...rest }: BackButtonProps): JSX.Element => {
    const navigate = useNavigate();
    const handleOnClick: BackButtonOnClick = () => {
        //Verify not leaving the site
        if (!window.history?.state || window.history?.state?.idx === 0) {
            navigate(DashboardRoutes.MAIN);
        } else {
            navigate(-1);
        }
    };
    return <BackButtonRoot {...rest} className={cx("back-button", className)} style={style} direction="left" onClick={handleOnClick} />;
};

export default BackButton;
