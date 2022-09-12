import BasePage from "module/common/component/layout/BasePage/BasePage";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import ProfileHeader from "module/user/component/layout/ProfileHeader/ProfileHeader";

const ProfilePage = (): JSX.Element => {
    return (
        <BasePage>
            {{
                header: <ProfileHeader />,
                content: (
                    <PageContent>
                        <div style={{ background: "green", height: "150vh" }} />
                    </PageContent>
                ),
            }}
        </BasePage>
    );
};

export default ProfilePage;
