import { devUsers } from "../../packages/backend/src/database/seeders/seeders-data/users";

const USER_WITH_COLLECTIONS_AND_NFTS = devUsers[0];
const USER_WITHOUT_COLLECTIONS_OR_NFTS = devUsers[1];

function visitUserPage(address: string): void {
    cy.visit(`/user/${address}`);
    cy.waitForReact(1000, "#root");
}

describe("Profile Page", () => {
    /* Common behaviour tests */
    it("Visits any user", () => {
        visitUserPage(USER_WITHOUT_COLLECTIONS_OR_NFTS.address);
        cy.contains(USER_WITHOUT_COLLECTIONS_OR_NFTS.name);
        cy.contains("a", USER_WITHOUT_COLLECTIONS_OR_NFTS.address);
        cy.contains("button", "Edit Profile");
    });

    /* Collection tests */
    it("Visits a user without collections", () => {
        visitUserPage(USER_WITHOUT_COLLECTIONS_OR_NFTS.address);
        cy.contains(USER_WITHOUT_COLLECTIONS_OR_NFTS.name);
        cy.contains("You have no collections");
        cy.contains("a", "Create Collection").should("have.attr", "href").and("equal", "/collections/creation");
    });

    it("Visits a user with collections", () => {
        visitUserPage(USER_WITH_COLLECTIONS_AND_NFTS.address);
        cy.contains(USER_WITH_COLLECTIONS_AND_NFTS.name);
        cy.contains("You have no collections").should("not.exist");
        cy.contains("Bored Ape Yacht Club");
    });

    /* NFT tests */
    it("Visits a user without NFTs", () => {
        visitUserPage(USER_WITHOUT_COLLECTIONS_OR_NFTS.address);
        cy.contains(USER_WITHOUT_COLLECTIONS_OR_NFTS.name);
        cy.contains("You have no NFTs");
        cy.contains("a", "Create NFT").should("have.attr", "href").and("equal", "/nfts/creation");
    });

    it("Visits a user with NFTs", () => {
        visitUserPage(USER_WITH_COLLECTIONS_AND_NFTS.address);
        cy.contains(USER_WITH_COLLECTIONS_AND_NFTS.name);
        cy.contains("You have no NFTs").should("not.exist");
        cy.contains("7742");
    });
});
