import { PipeTransform, Injectable } from "@nestjs/common";
import { NftFlagsRequest } from "../request/nft-flags.request";
import { BusinessException } from "../../common/exception/business.exception";
import { ErrorCode } from "../../common/exception/error-codes";

export interface TransferFeeValue {
    transferFee?: number;
    flags?: NftFlagsRequest;
}

@Injectable()
export class TransferFeePipe implements PipeTransform {
    transform(value: TransferFeeValue) {
        const { transferFee, flags } = value;
        if (transferFee !== undefined) {
            if (!flags?.transferable) throw new BusinessException(ErrorCode.NFT_TRANSFERABLE_NOT_SET);
        }
        return value;
    }
}
