describe("The Dashboard Page", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.waitForReact(1000, "#root");
    });

    it("successfully loads", () => {
        cy.get("button").click();
    });
});
