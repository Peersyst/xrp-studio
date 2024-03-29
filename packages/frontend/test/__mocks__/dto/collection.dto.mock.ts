import { CollectionDto, NftDto, UserDto } from "module/api/service";
import { UserDtoMock } from "./user.dto.mock";

export class CollectionDtoMock {
    id: number;
    taxon: number;
    name?: string;
    description?: string;
    image?: string;
    header?: string;
    items: number;
    account: string;
    path: string;
    nfts: NftDto[];
    user: UserDto;

    constructor({
        id = 1,
        taxon = 1,
        name = "collection_name",
        description = "collection_description",
        image = "collection_img_url",
        header = "collection_header_url",
        items = 1000,
        path = "collection_name_by_user",
        user = new UserDtoMock(),
        nfts = [],
    }: Partial<CollectionDto> = {}) {
        this.id = id;
        this.taxon = taxon;
        this.name = name;
        this.description = description;
        this.image = image;
        this.header = header;
        this.items = items;
        this.user = user;
        this.nfts = nfts;
        this.account = user.address;
        this.path = path;
    }
}
