import { ACTION_LABEL } from "module/common/component/display/Balance/utils/actionLabels";
import { CURRENCY_UNIT } from "module/common/component/display/Balance/utils/currencies";
import Balance from "module/common/component/display/Balance/Balance";
import { render } from "test-utils";
import config from "config/config";

describe("Text for the Balance component", () => {
    test("Renders correctly", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} />);
        expect(screen.getByRole("heading", { name: "100" })).toBeDefined();
    });
    test("Renders correctly near", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} units="token" />);
        expect(screen.getByRole("heading", { name: "100 " + config.tokenName })).toBeDefined();
    });
    test("Renders correctly eur", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} units="eur" />);
        expect(screen.getByRole("heading", { name: "100 " + CURRENCY_UNIT["eur"] })).toBeDefined();
    });
    test("Renders correctly dollar", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} units="usd" action="add" />);
        expect(screen.getByRole("heading", { name: ACTION_LABEL["add"] + " 100 " + CURRENCY_UNIT["usd"] })).toBeDefined();
    });
    test("Renders correctly round", () => {
        const screen = render(<Balance action="round" balance={"100"} variant={"h1"} units="usd" />);
        expect(screen.getByRole("heading", { name: ACTION_LABEL["round"] + " 100 " + CURRENCY_UNIT["usd"] })).toBeDefined();
    });
    test("Renders correctly when loading", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} isLoading />);
        expect(screen.getByTestId("LoaderIcon")).toBeDefined();
    });
});
