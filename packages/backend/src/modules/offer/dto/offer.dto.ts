import { Offer } from "../../../database/entities/Offer";
import { UserDto } from "../../user/dto/user.dto";

export class OfferDto {
    id: number;
    offerId: string;
    offerHash: string;
    creatorUser?: UserDto;
    accepterUser?: UserDto;
    acceptOfferHash?: string;
    destination?: string;
    amount?: string;
    expiration?: number;

    static fromEntity(offer: Offer): OfferDto {
        return {
            id: offer.id,
            offerId: offer.offerId,
            offerHash: offer.offerHash,
            creatorUser: offer.creatorUser ? UserDto.fromEntity(offer.creatorUser) : undefined,
            accepterUser: offer.accepterUser ? UserDto.fromEntity(offer.accepterUser) : undefined,
            acceptOfferHash: offer.acceptOfferHash,
            destination: offer.destination,
            amount: offer.amount,
            expiration: offer.expiration,
        };
    }
}
