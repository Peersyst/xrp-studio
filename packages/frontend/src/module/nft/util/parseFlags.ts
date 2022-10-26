import { NftFlagsRequest } from "module/api/service";
/**
 * Parse flags from request
 * 0001 -> burnable
 * 0010 -> onlyXRP
 * 0100 -> transferable
 * 1000 -> sellable
 * 0011 -> burnable i onlyXRP
 * 0111 -> burnable, onlyXRP i transferable
 * 1111 -> all activated
 */
export default function (flags: number): NftFlagsRequest {
    return {
        burnable: !!(flags & 1),
        onlyXRP: !!(flags & (1 << 1)),
        trustLine: !!(flags & (1 << 2)),
        transferable: !!(flags & (1 << 3)),
    };
}
