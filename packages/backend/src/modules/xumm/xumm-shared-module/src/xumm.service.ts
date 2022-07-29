import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { XummSdk } from "xumm-sdk";
import { PayloadAndSubscription, XummJsonTransaction, XummPostPayloadResponse } from "xumm-sdk/dist/src/types";
import { XummI, XummStatus } from "./dto/xumm.dto";
import { XummBusinessException } from "./exception/business.exception";
import { XummErrorCode } from "./exception/error-codes";
import { verifySignature } from "verify-xrpl-signature";
import { onPayloadEvent } from "xumm-sdk/dist/src/types/Payload/onPayloadEvent";

export interface XummRepositoryInterface {
    create: (userToken: string, address: string, payloadId?: string) => Promise<XummI>;
    findByPayloadId: (payloadId: string) => Promise<XummI>;
    findByAddress: (address: string) => Promise<XummI>;
    deletePrevious: (address: string) => Promise<void>;
}

@Injectable()
export class XummService {
    private readonly appKey: string;
    private readonly appSecret: string;
    private readonly xummSdk: XummSdk;

    constructor(
        @Inject(ConfigService) private configService: ConfigService,
        @Inject("XummRepository") private readonly xummRepository: XummRepositoryInterface,
    ) {
        this.appKey = this.configService.get("xumm.appKey");
        this.appSecret = this.configService.get("xumm.appSecret");
        this.xummSdk = new XummSdk(this.appKey, this.appSecret);
    }

    async signIn(): Promise<XummPostPayloadResponse> {
        const subscription = await this.xummSdk.payload.createAndSubscribe(
            {
                txjson: {
                    TransactionType: "SignIn",
                },
            },
            async (event) => {
                // console.log(`Payload ${event.uuid} data:`, event.data);
                if (event.data.signed !== undefined) {
                    const signedPayload = await this.xummSdk.payload.get(subscription.created.uuid);
                    const userToken = signedPayload?.application.issued_user_token;
                    const address = signedPayload?.response.account;
                    const verifyResult = verifySignature(signedPayload.response.hex);

                    if (signedPayload.meta.signed !== true) {
                        event.resolve("is not signed");
                    } else if (verifyResult.signatureValid !== true || verifyResult.signedBy !== address) {
                        event.resolve("wrong signature");
                    } else {
                        await this.xummRepository.deletePrevious(address);
                        await this.xummRepository.create(userToken, address, subscription.created.uuid);
                        event.resolve("is signed");
                    }
                }
            },
        );

        return subscription.created;
    }

    async verifySignIn(payloadId: string): Promise<string | null> {
        const xumm = await this.xummRepository.findByPayloadId(payloadId);
        if (!xumm) return null;
        return xumm.address;
    }

    async paymentRequest(sender: string, receiver: string, amount: string): Promise<XummPostPayloadResponse> {
        const xummEntity = await this.xummRepository.findByAddress(sender);
        if (!xummEntity) {
            throw new XummBusinessException(XummErrorCode.USER_NOT_SIGNED_IN);
        }
        return await this.xummSdk.payload.create({
            txjson: {
                TransactionType: "Payment",
                Destination: receiver,
                Amount: amount,
            },
            user_token: xummEntity.userToken,
        });
    }

    async transactionRequest(sender: string, transaction: XummJsonTransaction): Promise<XummPostPayloadResponse> {
        const xummEntity = await this.xummRepository.findByAddress(sender);
        if (!xummEntity) {
            throw new XummBusinessException(XummErrorCode.USER_NOT_SIGNED_IN);
        }
        return await this.xummSdk.payload.create({
            txjson: transaction,
            user_token: xummEntity.userToken,
        });
    }

    async transactionRequestAndSubscribe(
        sender: string,
        transaction: XummJsonTransaction,
        callback?: onPayloadEvent,
    ): Promise<PayloadAndSubscription> {
        const xummEntity = await this.xummRepository.findByAddress(sender);
        if (!xummEntity) {
            throw new XummBusinessException(XummErrorCode.USER_NOT_SIGNED_IN);
        }
        return await this.xummSdk.payload.createAndSubscribe(
            {
                txjson: transaction,
                user_token: xummEntity.userToken,
            },
            callback,
        );
    }

    async getStatus(uuid: string): Promise<XummStatus> {
        const payload = await this.xummSdk.payload.get(uuid);
        if (!payload) throw new XummBusinessException(XummErrorCode.PAYLOAD_NOT_FOUND);
        const { signed, cancelled, expired, resolved } = payload.meta;
        if (!resolved) return XummStatus.PENDING;
        if (expired) return XummStatus.EXPIRED;
        else if (cancelled) return XummStatus.CANCELLED;
        else if (signed) {
            const verifyResult = verifySignature(payload.response.hex);
            if (verifyResult.signatureValid !== true) {
                return XummStatus.BAD_SIGNATURE;
            } else {
                return XummStatus.SIGNED;
            }
        } else {
            return XummStatus.DECLINED;
        }
    }
}
