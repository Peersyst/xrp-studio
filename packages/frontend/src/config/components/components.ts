import { CreateConfig } from "@peersyst/react-components";

const components: CreateConfig["components"] = {
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
