const {
    Given,
    When,
    Then,
} = require("@badeball/cypress-cucumber-preprocessor");

// Given("Testing APIs with Cypress", () => {});
When("POST request", () => {
    // Testing POST request
    cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        body: {
            name: "morpheus",
            job: "leader",
        },
    }).as("postRequest");
});
//we can test ANYTHING that comes from the server e.g. we can test response status
Then("Then POST request should return 201 & more", () => {
    cy.get("@postRequest").should((response) => {
        expect(response.status).to.eq(201);

        //test exact string value
        expect(response.headers.server).to.eq("cloudflare");

        //test random properties
        expect(response.isOkStatusCode).to.be.true;
        expect(response.body).property("id").to.be.a("string");

        //we can test response headers e.g. response header to be an object
        expect(response.headers).to.be.an("object");
        //object to include the following properties and values
        expect(response.headers).to.deep.include({
            ["cf-cache-status"]: "DYNAMIC",
            ["x-powered-by"]: "Express",
            server: "cloudflare",
            connection: "keep-alive",
        });

        //test response body for complex assertion
        expect(response.body)
            .to.be.an("object")
            .that.does.include({ name: "morpheus", job: "leader" });
        // test response body to include specific properties and values & not to include
        expect(response.body)
            .to.include({ name: "morpheus", job: "leader" })
            .that.does.not.include({ name: "Tim", job: "initiate" });
    });
});