import { TestServer } from "../TestServer";
import express from "express";
import supertest from "supertest";
import chai from "chai";

const server: TestServer = new TestServer();
let app: express.Application;

describe("Test RoleRoute", () => {

    before((done) => {
        console.log("start unit test");
        server.start().then(() => {
            app = server.App();
            done();
        });
    });

    after(() => {
        console.log("finish unit test");
    });
    
    it("Find all roles", (done) => {
        supertest(app).get("/api/roles")
            .set("Accept", "application/json")
            .end((err: Error, res: supertest.Response) => {
                console.log(res.status)
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body).to.be.a("array");
                done();
            });
    });

    it("Can create a new Role", (done) => {
        supertest(app).post("/api/roles")
            .set("Accept", "application/json")
            .send({
                    role_name: "D_Test",
                    role_group: "D1",
                    role_type: "D"
                })
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body.role_id).to.be.a("number");
                chai.expect(res.body.role_name).to.be.a("string");
                done();
            });
    });
});