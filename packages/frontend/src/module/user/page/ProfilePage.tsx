import BasePage from "module/common/component/layout/BasePage/BasePage";
import ProfileHeader from "module/user/component/layout/ProfileHeader/ProfileHeader";
import ProfileContent from "../component/layout/ProfileContent/ProfileContent";
import useGetUser from "module/user/query/useGetUser";
import NotFoundPage from "module/common/page/NotFoundPage/NotFoundPage";

const ProfilePage = (): JSX.Element => {
    const { data: user, isLoading } = useGetUser();

    if (!isLoading && !user) return <NotFoundPage />;

    return (
        <BasePage>
            {{
                header: <ProfileHeader />,
                content: <ProfileContent />,
            }}
        </BasePage>
    );
};

export default ProfilePage;
