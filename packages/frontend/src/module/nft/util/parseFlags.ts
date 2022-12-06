import { NftFlagsRequest } from "module/api/service";
/**
 * Parse flags from request
 * 001 -> burnable
 * 010 -> onlyXRP
 * 100 -> transferable
 * 011 -> burnable i onlyXRP
 * 111 -> all activated
 */
export default function (flags: number): NftFlagsRequest {
    return {
        burnable: !!(flags & 1),
        onlyXRP: !!(flags & (1 << 1)),
        trustLine: false,
        transferable: !!(flags & (1 << 3)),
    };
}
