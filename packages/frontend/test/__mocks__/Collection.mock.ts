// TODO: Apply backend DTO
class CollectionMock {
    id: number;
    name: string;
    image: string;
    items: number;

    constructor({
        id = 1,
        name = "Bored Apes",
        image = "https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s168",
        items = 1000,
    }: any = {}) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.items = items;
    }
}

export default CollectionMock;
