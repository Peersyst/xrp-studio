import { image } from "asset";
import { NavigationButtonProps } from "module/common/component/navigation/NavigationButton/NavigationButton.types";
import { NavigationButtonRoot } from "module/common/component/navigation/NavigationButton/NavigationButton.styles";

const NavigationButton = ({ navigate }: NavigationButtonProps): JSX.Element => {
    return (
        <NavigationButtonRoot onClick={() => void 0}>
            <>
                {navigate === "next" && <img src={image.next} alt="next" />}
                {navigate === "back" && <img src={image.back} alt="back" />}
            </>
        </NavigationButtonRoot>
    );
};

export default NavigationButton;
