import { DefaultNamespace, KeyPrefix, Namespace, TFunction, useTranslation, UseTranslationOptions } from "react-i18next";

export default function <N extends Namespace = DefaultNamespace, TKPrefix extends KeyPrefix<N> = undefined>(
    ns?: N | Readonly<N>,
    options?: UseTranslationOptions<TKPrefix>,
): TFunction<N, TKPrefix> {
    return useTranslation<N, TKPrefix>(ns, options).t;
}
