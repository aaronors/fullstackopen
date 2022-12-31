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

        it("A blog can be created", function () {
            cy.contains("new blog").click();
            cy.get("#titleInput").type("title");
            cy.get("#authorInput").type("author");
            cy.get("#urlInput").type("url.com");
            cy.get("#createBlog").click();

            cy.contains("title author");
        });

        describe("and a blog exists", function () {
            beforeEach(function () {
                cy.createBlog({title: "title", author: "author", url: "url.com"});
            });            

            it("A blog can be liked", function () {
                cy.contains("title author").contains("show").click();
                cy.contains("0").contains("like").click();

                cy.get(".success")
                    .should("contain", "A like has been added to title");

                cy.get(".blogBody").should("contain", "1");
            })

            it("A blog can be deleted", function () {
                cy.contains("title author").contains("show").click();
                cy.contains("remove").click();

                cy.get(".success").should("contain", "title has been deleted");        
                cy.get("html").should("not.contain", "title author");  
            })            

        });
        describe("and a multiple blogs exist", function () {
            beforeEach(function () {
                cy.createBlog({title: "title1", author: "author1", url: "1url.com", likes: 5});
                cy.createBlog({title: "title2", author: "author2", url: "2url.com", likes: 10});
                cy.createBlog({title: "title3", author: "author3", url: "3url.com", likes: 15});
            });      

            it.only("The blogs are ordered in descending order by likes", function () {
                cy.get("li").eq(0).should("contain", "title3");
                cy.get("li").eq(1).should("contain", "title2");
                cy.get("li").eq(2).should("contain", "title1");
            });
        });
    });
});
