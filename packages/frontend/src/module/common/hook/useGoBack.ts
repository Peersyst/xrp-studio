import { useNavigate } from "react-router-dom";
import { DashboardRoutes } from "module/dashboard/DashboardRouter";

export default function (): () => void {
    const navigate = useNavigate();

    return () => {
        //Verify not leaving the site
        if (!window.history?.state || window.history?.state?.idx === 0) {
            navigate(DashboardRoutes.MAIN);
        } else {
            navigate(-1);
        }
    };
}
