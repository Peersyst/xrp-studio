import { User } from "../../../src/database/entities/User";

class UserMock extends User {
    constructor({
        address = "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2",
        name = "UserName",
        description,
        image,
        header,
        twitter,
        discord,
        nfts,
        collections,
    }: Partial<User> = {}) {
        super();
        this.address = address;
        this.name = name;
        this.description = description;
        this.image = image;
        this.header = header;
        this.twitter = twitter;
        this.discord = discord;
        this.nfts = nfts;
        this.collections = collections;
    }
}

export default UserMock;
