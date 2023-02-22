import { useEffect, useState } from "react";
import { NftDraftStatusDto, NftService } from "module/api/service";
import timeoutPolling from "module/common/util/timeoutPolling";

export interface UseCollectionNftsStatusResult {
    fetch: () => Promise<NftDraftStatusDto[] | undefined> | undefined;
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

    const fetch = (): Promise<NftDraftStatusDto[] | undefined> | undefined => {
        if (ids) return timeoutPolling(() => NftService.nftControllerGetNftDraftStatus(undefined, ids), handleStatuses);
        return undefined;
    };

    return {
        fetch,
        pendingIds,
        failedIds,
    };
}
