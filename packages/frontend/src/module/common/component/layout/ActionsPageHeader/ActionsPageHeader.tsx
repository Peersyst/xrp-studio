import useTranslate from "module/common/hook/useTranslate";
import useGoBack from "module/common/hook/useGoBack";
import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import ActionButtonGroup from "module/common/component/input/ActionButtonGroup/ActionButtonGroup";
import { Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import { useMemo } from "react";
import { ActionButtonProps } from "module/common/component/input/ActionButton/ActionButton.types";
import { ActionsPageHeaderProps } from "module/common/component/layout/ActionsPageHeader/ActionsPageHeader.types";

function ActionsPageHeader<T extends string = string>({
    loading,
    backPath,
    title,
    actions: actionsProp = [],
}: ActionsPageHeaderProps<T>): JSX.Element {
    const translate = useTranslate();
    const goBack = useGoBack(backPath);

    const [actions, anyActionIsLoading] = useMemo(
        () =>
            actionsProp.reduce(
                (prev, { disabled: actionButtonDisabled, loading: actionButtonLoading, ...restActionButtonProps }) => {
                    return [
                        [...prev[0], { disabled: loading || actionButtonDisabled, loading: actionButtonLoading, ...restActionButtonProps }],
                        !!actionButtonLoading,
                    ];
                },
                [[] as ActionButtonProps[], false],
            ),
        [actionsProp],
    );

    return (
        <MainPageHeader
            title={title}
            complement={
                <Row gap="1rem" wrap wrapGap="1.5rem">
                    <Button size="lg" variant="secondary" disabled={anyActionIsLoading} onClick={goBack}>
                        {translate("cancel")}
                    </Button>
                    {!!actions.length && <ActionButtonGroup actions={actions} />}
                </Row>
            }
        />
    );
}

export default ActionsPageHeader;
