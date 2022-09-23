import BasePage from "module/common/component/layout/BasePage/BasePage";
import ProfileHeader from "module/user/component/layout/ProfileHeader/ProfileHeader";
import ProfileContent from "../component/layout/ProfileContent/ProfileContent";

const ProfilePage = (): JSX.Element => {
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
