export interface XummI {
    userToken: string;
    address: string;
    payloadId?: string;
}

export enum XummStatus {
    DECLINED = "declined",
    SIGNED = "signed",
    PENDING = "pending",
    BAD_SIGNATURE = "bad-signature",
    CANCELLED = "cancelled",
    EXPIRED = "expired",
}
