describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3001/api/testing/reset");
        const user = {
            name: "aaron",
            username: "aaronors",
            password: "password",
        };
        cy.request("POST", "http://localhost:3001/api/users/", user);
        cy.visit("http://localhost:3000");
    });

    describe("when at the login screen", function () {
        it("a login form is shown", function () {
            cy.contains("Log in to application");
        });

        it("user can log in", function () {
            cy.get("#username").type("aaronors");
            cy.get("#password").type("password");
            cy.get("#login-button").click();

            cy.contains("aaron logged in");
        });

        it("login fails with the wrong password", function () {
            cy.get("#username").type("aaronors");
            cy.get("#password").type("wrong");
            cy.get("#login-button").click();

            cy.get(".error")
                .should("contain", "Wrong credentials")
                .and("have.css", "color", "rgb(255, 0, 0)")
                .and("have.css", "border-style", "solid");

            cy.get("html").should("not.contain", "aaron logged in");
        });
    });
    describe("when logged in", function () {
        beforeEach(function () {
            cy.login({ username: "aaronors", password: "password" });
        });

        it.only("A blog can be created", function () {
            cy.contains("new blog").click();
            cy.get("#titleInput").type("title");
            cy.get("#authorInput").type("author");
            cy.get("#urlInput").type("url.com");
            cy.get("#createBlog").click();

            cy.contains("title author");
        });
    });
});
