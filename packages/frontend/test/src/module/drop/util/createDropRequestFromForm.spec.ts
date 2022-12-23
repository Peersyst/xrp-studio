import { DropCreationForm } from "module/drop/types";
import Color from "color";
import createDropRequestFromForm from "module/drop/util/createDropRequestFromForm";

describe("createDropRequestFormForm", () => {
    test("Creates request with only required values", () => {
        const formData: DropCreationForm = {
            price: "1",
            backgroundColor: new Color("#000000"),
            fontColor: new Color("#FFFFFF"),
            faqs: [],
        };

        expect(createDropRequestFromForm(1, formData)).toEqual({
            collectionId: 1,
            price: "1000000",
            backgroundColor: "#000000",
            fontColor: "#FFFFFF",
            videoUrl: undefined,
            instagram: undefined,
            twitter: undefined,
            discord: undefined,
            faqs: [],
        });
    });

    test("Creates request with all values", () => {
        const formData: DropCreationForm = {
            price: "1",
            backgroundColor: new Color("#000000"),
            fontColor: new Color("#FFFFFF"),
            videoUrl: "video_url",
            instagram: "instagram",
            twitter: "twitter",
            discord: "discord",
            faqs: [],
        };
        expect(createDropRequestFromForm(1, formData)).toEqual({
            collectionId: 1,
            price: "1000000",
            backgroundColor: "#000000",
            fontColor: "#FFFFFF",
            videoUrl: "video_url",
            instagram: "instagram",
            twitter: "twitter",
            discord: "discord",
            faqs: [],
        });
    });
});
