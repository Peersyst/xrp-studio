export default {
    get: jest.fn((key: string) => {
        switch (key) {
            case "server.port":
                return 3000;
            case "server.encryptionKey":
                return "rPGL/acJe6f5CmCGn05bec6oS2+jmyFnHFIwZblZCgE=";
            default:
                return "default-config-setting";
        }
    }),
};
