import { NftFlagsRequest } from "module/api/service";

export default function (flags: number): NftFlagsRequest {
    return {
        burnable: !!(flags & 1),
        onlyXRP: !!(flags & (1 << 1)),
        trustLine: !!(flags & (1 << 2)),
        transferable: !!(flags & (1 << 3)),
    };
}
