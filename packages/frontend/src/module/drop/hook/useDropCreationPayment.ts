import useDropPayment from "module/drop/query/useDropPayment";
import xummRequestIsSignedPolling from "module/wallet/util/xummRequestIsSignedPolling";
import txIsValidatedPolling from "module/blockchain/util/txIsValidatedPolling";
import { useState } from "react";
import { XummService } from "module/api/service";
import { XummPayloadDto } from "module/api/external-models";

export interface UseDropCreationPaymentResult {
    fetch: () => Promise<void>;
    isSigned: boolean;
    isValidated: boolean;
    paymentHash: string | undefined;
}

export default function (collectionId: number): UseDropCreationPaymentResult {
    const [isSigned, setIsSigned] = useState(false);
    const [paymentHash, setPaymentHash] = useState<string | undefined>();
    const [isValidated, setIsValidated] = useState(false);
    const { mutateAsync: dropPayment } = useDropPayment();

    const fetch = async () => {
        const dropPaymentData = await dropPayment({ collectionId });

        await xummRequestIsSignedPolling(dropPaymentData!.xummUuid);
        setIsSigned(true);

        const xummPayload: XummPayloadDto = await XummService.xummControllerGetPayload(dropPaymentData!.xummUuid);
        setPaymentHash(xummPayload.response.txid!);

        await txIsValidatedPolling(xummPayload.response.txid!);
        setIsValidated(true);
    };

    return {
        fetch,
        isSigned,
        isValidated,
        paymentHash,
    };
}
