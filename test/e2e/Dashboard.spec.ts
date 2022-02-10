describe("The Dashboard Page", () => {
    it("successfully loads", () => {
        cy.visit("/");
        cy.waitForReact(1000, "#root");
        cy.react("Buttonstyles__ButtonRoot").click();
        expect(cy.react("Buttonstyles__ButtonRoot").getProps("children")).to.equal("Loading...");
    });

    it("successfully loads", () => {∂
        cy.visit("/");
    });
});
