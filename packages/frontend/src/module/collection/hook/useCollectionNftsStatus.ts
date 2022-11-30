import polling from "module/common/util/polling";
import { useEffect, useState } from "react";
import { NftDraftStatusDto } from "module/api/service";

// TODO: Mock xummSignaturesMock as it is not defined in the API
async function collectionNftsStatusMock(ids: number[]): Promise<NftDraftStatusDto[]> {
    await new Promise<void>((resolve) => setTimeout(resolve, 3000));
    return ids.map((id) => ({ id, status: "confirmed" }));
}

export interface UseCollectionNftsStatusResult {
    fetch: () => Promise<NftDraftStatusDto[]> | undefined;
    pendingIds: number[] | undefined;
    failedIds: number[];
}

export default function (ids: number[] | undefined): UseCollectionNftsStatusResult {
    const [pendingIds, setPendingIds] = useState<number[]>();
    const [failedIds, setFailedIds] = useState<number[]>([]);

    useEffect(() => {
        if (ids) setPendingIds(ids);
    }, [ids]);

    const handleStatuses = (res: NftDraftStatusDto[]): boolean => {
        const statuses = res.reduce(
            ({ pending, failed }, { id, status }) => {
                if (status !== "confirmed" && status !== "draft") {
                    if (status === "pending")
                        return {
                            pending: [...pending, id],
                            failed,
                        };
                    else
                        return {
                            pending,
                            failed: [...failed, id],
                        };
                }
                return {
                    pending,
                    failed,
                };
            },
            { pending: [] as number[], failed: [] as number[] },
        );
        setPendingIds(statuses.pending);
        setFailedIds(statuses.failed);
        return !!statuses.pending.length;
    };

    const fetch = (): Promise<NftDraftStatusDto[]> | undefined => {
        if (ids)
            return polling(
                () => collectionNftsStatusMock(ids) /*NftService.nftControllerGetNftDraftStatus(undefined, ids)*/,
                handleStatuses,
            );
        return undefined;
    };

    return {
        fetch,
        pendingIds,
        failedIds,
    };
}
