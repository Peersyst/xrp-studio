import { CreateConfig } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";

const components: CreateConfig["components"] = {
    Dialog: {
        actions: {
            component: Button,
        },
    },
    Divider: {
        defaultProps: {
            color: "black.80",
        },
    },
    Drawer: {
        defaultProps: {
            position: "right",
            elevation: 3,
        },
    },
    Modal: {
        defaultProps: {
            elevation: 3,
        },
    },
    Switch: {
        defaultProps: {
            LabelProps: {
                placement: "right",
            },
        },
    },
    SelectGroup: {
        defaultProps: {
            selectorLabelProps: {
                placement: "left",
                alignment: "space-between",
                singleLine: true,
            },
        },
    },
    Paper: {
        defaultProps: {
            elevation: 0,
        },
    },
};

export default components;
