import { useNavigate } from "react-router-dom";
import { DashboardRoutes } from "module/dashboard/DashboardRouter";

export default function (path?: string): () => void {
    const navigate = useNavigate();

    return () => {
        if (path) navigate(path);
        //Verify not leaving the site
        else if (!window.history?.state || window.history?.state?.idx === 0) navigate(DashboardRoutes.MAIN, { replace: true });
        else navigate(-1);
    };
}
