import { TFunction, useTranslation } from "react-i18next";

export default function (): TFunction<"translation"> {
    return useTranslation().t;
}
