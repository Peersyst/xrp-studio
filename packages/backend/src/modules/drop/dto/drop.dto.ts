import { Paginated } from "../../common/paginated.dto";
import { CollectionDto } from "../../collection/dto/collection.dto";
import { FaqDto } from "./faq.dto";
import { Drop } from "../../../database/entities/Drop";

export class DropDto {
    id: number;
    price: string;
    backgroundColor: string;
    fontColor: string;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs: FaqDto[];
    collection?: CollectionDto;

    static fromEntity(drop: Drop): DropDto {
        return {
            id: drop.id,
            price: drop.price,
            backgroundColor: drop.backgroundColor,
            fontColor: drop.fontColor,
            videoUrl: drop.videoUrl,
            instagram: drop.instagram,
            twitter: drop.twitter,
            discord: drop.discord,
            faqs: drop.faqs.map((faq) => FaqDto.fromEntity(faq)),
            collection: drop.collection && CollectionDto.fromEntity(drop.collection),
        };
    }
}

export class PaginatedDropDto extends Paginated<DropDto> {
    items: DropDto[];
}

export const DropDtoMock: DropDto = {
    id: 1,
    price: "888880000",
    backgroundColor: "#2E3439",
    fontColor: "#FFFFFF",
    videoUrl: "https://www.youtube.com/watch?v=qt1equGhkQE",
    instagram: "boredapeyachtclub",
    twitter: "boredapeyc",
    discord: "3P5K3dzgdB",
    faqs: [
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
            answer: "Curabitur vestibulum dignissim ante, et volutpat lacus malesuada ac. Vestibulum nec suscipit enim. Aliquam rhoncus ligula massa, et dignissim dolor euismod sit amet. Fusce ut maximus dolor. Sed tincidunt facilisis enim. Donec sed augue porta, sollicitudin nibh vehicula, blandit ligula. Pellentesque iaculis lorem eget ligula consectetur, sed porta mi aliquam. In non sodales massa.",
        },
        {
            question: "Fusce non pharetra quam, vel convallis magna?",
            answer: "Quisque ullamcorper, purus sed tincidunt facilisis, tortor nisl tincidunt ligula, vel volutpat velit ipsum at erat. Cras non nibh justo. Integer porta fringilla ipsum, sit amet cursus risus. Phasellus mauris sapien, tincidunt ut neque sed, sollicitudin imperdiet ipsum. Sed metus orci, vestibulum in quam eget, lobortis vestibulum ante. Duis sagittis nibh vel sapien pharetra, in dignissim nibh dignissim. Integer vulputate non magna sed lobortis. Vestibulum eu pellentesque mauris.",
        },
        {
            question: "Cras at elit sagittis, varius sem vitae, consectetur dolor?",
            answer: "Curabitur viverra diam nec volutpat gravida. Phasellus tincidunt risus nec nulla venenatis, in sollicitudin felis convallis. Vestibulum ultrices lorem sit amet fermentum dignissim. Sed varius neque ut lacus efficitur maximus. Fusce eget blandit dui. Nullam vehicula tortor et lobortis pellentesque. Cras consequat ultrices odio viverra iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in augue ante.",
        },
    ],
    collection: {
        id: 1,
        taxon: 1,
        name: "Bored Ape Yacht Club",
        description:
            "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.",
        image: "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=1920",
        header: "https://i.seadn.io/gae/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs?auto=format&w=1920",
        items: 0,
        user: {
            address: "rnFCYEkc6fUsgUDzCprNEGppuHj5AwSPdi",
            name: "YungBeef",
            description: "Curabitur vestibulum dignissim ante, et volutpat lacus malesuada ac.",
            image: "https://pbs.twimg.com/profile_images/1399966612405592065/irAtrWtO_400x400.jpg",
            header: "https://pbs.twimg.com/profile_banners/1357749263632109570/1647040001/1500x500",
            twitter: "yugalabs",
            discord: "yugalabs",
        },
    },
};
