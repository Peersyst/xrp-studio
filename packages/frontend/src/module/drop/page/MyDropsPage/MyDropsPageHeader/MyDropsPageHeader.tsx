import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import useTranslate from "module/common/hook/useTranslate";

const MyDropsPageHeader = (): JSX.Element => {
    const translate = useTranslate();

    return <MainPageHeader title={translate("myDrops")} stickyTitle={translate("myDrops").toUpperCase()} />;
};

export default MyDropsPageHeader;
