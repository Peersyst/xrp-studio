describe("Dashboard - example", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should display header", () => {
        cy.contains("Log in").should("be.exist");
    });
});
