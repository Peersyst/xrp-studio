import { ValidatedLedgerTransaction } from "../blockchain/types";
import { NFTokenAcceptOffer, NFTokenCreateOffer } from "xrpl";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Offer, OfferType } from "../../database/entities/Offer";
import { forwardRef, Inject, Logger } from "@nestjs/common";
import { NftService } from "../nft/nft.service";
import { UserService } from "../user/user.service";
import { BlockchainTransactionService } from "../blockchain/blockchain-transaction.service";
import { NftStatus } from "../../database/entities/Nft";
import { CreateOfferRequest } from "./request/create-offer.request";
import { XummTransactionService } from "../xumm/xumm-transaction.service";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";
import { of } from "rxjs";

export class OfferService {
    private logger = new Logger(OfferService.name);

    constructor(
        @InjectRepository(Offer) private readonly offerRepository: Repository<Offer>,
        @Inject(forwardRef(() => NftService)) private readonly nftService: NftService,
        @Inject(forwardRef(() => BlockchainTransactionService)) private readonly blockchainTransactionService: BlockchainTransactionService,
        private readonly xummTransactionService: XummTransactionService,
        private readonly userService: UserService,
    ) {}

    async createOffer(account: string, request: CreateOfferRequest): Promise<void> {
        const nft = await this.nftService.findOne<[NftStatus.CONFIRMED]>({ id: request.nftId, status: NftStatus.CONFIRMED });
        const transaction = await this.blockchainTransactionService.prepareOfferTransaction({
            account: account,
            tokenId: nft.tokenId,
            price: request.price,
            type: request.type,
        });

        await this.xummTransactionService.sendTransactionRequest(account, transaction);
    }

    async acceptOffer(account: string, id: number): Promise<void> {
        const offer = await this.offerRepository.findOne(id);
        if (!offer) {
            throw new BusinessException(ErrorCode.OFFER_NOT_FOUND);
        }
        if (offer.destination && offer.destination !== account) {
            throw new BusinessException(ErrorCode.INVALID_OFFER_DESTINATION);
        }
        const transaction = await this.blockchainTransactionService.prepareAcceptOfferTransaction(account, offer.offerId);
        await this.xummTransactionService.sendTransactionRequest(account, transaction);
    }

    async processCreateOfferTransaction(transaction: ValidatedLedgerTransaction<NFTokenCreateOffer>): Promise<void> {
        this.logger.debug("Processing offer create transaction " + JSON.stringify(transaction));
        const nft = await this.nftService.findOne({ tokenId: transaction.NFTokenID });
        if (!nft) return this.logger.error("Can't process offer create transaction for not saved nft " + transaction.NFTokenID);
        await this.userService.createIfNotExists(transaction.Account);
        const offer = await this.offerRepository.save({
            nftId: nft.id,
            offerId: await this.blockchainTransactionService.getOfferIndexFromTransaction(transaction.hash),
            type: transaction.Flags === 1 ? OfferType.SELL : OfferType.BUY,
            creatorAccount: transaction.Account,
            owner: transaction.Owner,
            amount: typeof transaction.Amount === "string" ? transaction.Amount : JSON.stringify(transaction.Amount),
            expiration: transaction.Expiration,
            destination: transaction.Destination,
            offerHash: transaction.hash,
        });
        this.logger.debug("Processed offer create transaction with new offer " + JSON.stringify(offer));
    }

    async processAcceptOfferTransaction(transaction: ValidatedLedgerTransaction<NFTokenAcceptOffer>): Promise<void> {
        this.logger.debug("Processing accept offer transaction " + JSON.stringify(transaction));
        const sellOffer =
            transaction.NFTokenSellOffer &&
            (await this.offerRepository.findOne({ offerId: transaction.NFTokenSellOffer }, { relations: ["nft"] }));
        if (!sellOffer && transaction.NFTokenSellOffer) {
            return this.logger.warn(
                "Processed sell accept offer transaction that does not have offer created with id " + transaction.NFTokenSellOffer,
            );
        }
        const buyOffer =
            transaction.NFTokenBuyOffer &&
            (await this.offerRepository.findOne({ offerId: transaction.NFTokenBuyOffer }, { relations: ["nft"] }));
        if (!buyOffer && transaction.NFTokenBuyOffer) {
            return this.logger.warn(
                "Processed buy accept offer transaction that does not have offer created with id " + transaction.NFTokenBuyOffer,
            );
        }

        if (transaction.NFTokenSellOffer && !transaction.NFTokenBuyOffer) {
            await this.nftService.updateOwnerAccount(sellOffer.nftId, transaction.Account);
            await this.userService.createIfNotExists(transaction.Account);
            await this.offerRepository.update(
                { id: sellOffer.id },
                {
                    accepterAccount: transaction.Account,
                    acceptOfferHash: transaction.hash,
                },
            );
        } else if (!transaction.NFTokenSellOffer && transaction.NFTokenBuyOffer) {
            await this.nftService.updateOwnerAccount(buyOffer.nftId, buyOffer.creatorAccount);
            await this.userService.createIfNotExists(transaction.Account);
            await this.offerRepository.update(
                { id: buyOffer.id },
                {
                    accepterAccount: transaction.Account,
                    acceptOfferHash: transaction.hash,
                },
            );
        } else {
            await this.nftService.updateOwnerAccount(buyOffer.nftId, buyOffer.creatorAccount);
            await this.offerRepository.update(
                { id: buyOffer.id },
                {
                    accepterAccount: sellOffer.creatorAccount,
                    acceptOfferHash: transaction.hash,
                },
            );
            await this.offerRepository.update(
                { id: sellOffer.id },
                {
                    accepterAccount: buyOffer.creatorAccount,
                    acceptOfferHash: transaction.hash,
                },
            );
        }
    }
}
