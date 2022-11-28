import * as xrpl from "xrpl";

export const validPort = (port: number) => !isNaN(port) && port > 0 && port < 65535;

export const validB64Key = (key: string) => {
    try {
        return Buffer.from(key, "base64").length === 32;
    } catch (e) {
        return false;
    }
};

export const validXrpSecret = (key: string) => {
    try {
        return xrpl.isValidSecret(key);
    } catch (e) {
        return false;
    }
};
