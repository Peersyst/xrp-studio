import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import userEvent from "@testing-library/user-event";
import ActionModal from "module/common/component/feedback/DeprecatedActionModal/ActionModal";
import { ActionFn } from "module/common/component/feedback/ActionModal/ActionModal.types";

describe("ActionModal", () => {
    test("Renders correctly", () => {
        const cover = "Cover";
        const tab1 = "TAB 1";
        const tab2 = "TAB 2";
        const customCloseLabel = "Custom close";
        const customActionLabel = "Custom action";
        const customAction = jest.fn(({ next }): ActionFn => next());

        render(
            <ActionModal>
                {{
                    cover: <>{cover}</>,
                    tabs: [
                        {
                            content: <>{tab1}</>,
                            actions: [
                                { action: "back" },
                                { action: "close", label: customCloseLabel },
                                { action: "next", variant: "glass" },
                                { action: customAction, label: customActionLabel },
                            ],
                        },
                        {
                            content: <>{tab2}</>,
                            actions: [{ action: "close" }],
                        },
                    ],
                }}
            </ActionModal>,
        );

        // COVER
        expect(screen.getByText(cover)).toBeInTheDocument();
        // TAB 1
        expect(screen.getByText(tab1)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("back") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: customCloseLabel })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("next") })).toBeInTheDocument();
        userEvent.click(screen.getByRole("button", { name: customActionLabel }));
        expect(customAction).toHaveBeenCalled();
        // TAB 2
        expect(screen.getByText(tab2)).toBeInTheDocument();
    });
});
