import config from "config/config";
import XrplService from "module/blockchain/service/XrplService/XrplService";

export const MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_DROPS = BigInt(config.minAmountToCreateNftOffer) + BigInt(config.feeInDrops);
export const MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_XRP = XrplService.dropsToXrp(MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_DROPS.toString());
