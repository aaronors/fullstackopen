describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3001/api/testing/reset");
        cy.visit("http://localhost:3000");
    });

    describe("before logging in", function () {
        it("a login form is shown", function () {
            cy.contains("Log in to application");
        });
    });
});
