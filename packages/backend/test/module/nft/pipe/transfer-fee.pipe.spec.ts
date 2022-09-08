import { TransferFeePipe } from "../../../../src/modules/nft/pipe/transfer-fee.pipe";
import { BusinessException } from "../../../../src/modules/common/exception/business.exception";
import { ErrorCode } from "../../../../src/modules/common/exception/error-codes";

describe("TransferFeePipe", () => {
    test("transferFee is undefined and pipe returns the value", () => {
        //expect(new TransferFeePipe().transform({ flags: { burnable: true, onlyXRP: true, trustLine: false, transferable: false } }));
        expect(new TransferFeePipe().transform({})).toEqual({});
    });

    test("transferFee is set and so is transferable flag. Value is returned", () => {
        expect(
            new TransferFeePipe().transform({
                transferFee: 50,
                flags: { burnable: true, onlyXRP: true, trustLine: false, transferable: true },
            }),
        ).toEqual({
            transferFee: 50,
            flags: { burnable: true, onlyXRP: true, trustLine: false, transferable: true },
        });
    });

    test("Throws NFT_TRANSFERABLE_NOT_SET error when transferFee is set and flags are not provided", async () => {
        await expect(async () => {
            await new TransferFeePipe().transform({
                transferFee: 50,
            });
        }).rejects.toEqual(new BusinessException(ErrorCode.NFT_TRANSFERABLE_NOT_SET));
    });

    test("Throws NFT_TRANSFERABLE_NOT_SET error when transferFee is set and transferable flag is false", async () => {
        await expect(async () => {
            await new TransferFeePipe().transform({
                transferFee: 50,
                flags: { burnable: true, onlyXRP: true, trustLine: false, transferable: false },
            });
        }).rejects.toEqual(new BusinessException(ErrorCode.NFT_TRANSFERABLE_NOT_SET));
    });
});
