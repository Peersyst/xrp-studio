import { Inject, Injectable } from "@nestjs/common";
import { Transaction } from "xrpl";
import { XummService } from "@peersyst/xumm-module";
import { IMessageEvent } from "websocket";

@Injectable()
export class XummTransactionService {
    constructor(@Inject(XummService) private readonly xummService: XummService) {}

    public async sendTransactionRequest(
        signerAddress: string,
        transaction: Transaction,
        onFailed?: () => Promise<void>,
        onSuccess?: () => Promise<void>,
    ): Promise<void> {
        // Create transaction and subscribe
        const subscription = await this.xummService.transactionRequestAndSubscribe(signerAddress, { ...transaction });

        // Listen to XUMM transaction events
        // * If rejected or expired set draft status to "failed"
        subscription.websocket.onmessage = async (message: IMessageEvent) => {
            if (typeof message.data === "string") {
                try {
                    const jsonData = JSON.parse(message.data);
                    if (jsonData.signed === false || jsonData.expired === true) {
                        if (onFailed) await onFailed();
                        subscription.websocket.close();
                    } else if (jsonData.signed === true) {
                        if (onSuccess) await onSuccess();
                        subscription.websocket.close();
                    }
                } catch (e) {}
            }
        };
    }
}
