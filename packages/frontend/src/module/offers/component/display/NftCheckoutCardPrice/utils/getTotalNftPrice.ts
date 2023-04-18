import XrplService from "module/blockchain/service/XrplService/XrplService";

export function getTotalNftPrice(amount: number | string, fee: number | string): string {
    return String(BigInt(amount) + BigInt(fee));
}

export function getTotalNftPriceInXrp(amount: number | string, fee: number | string): string {
    return XrplService.dropsToXrp(getTotalNftPrice(amount, fee));
}
