// Basic Lib Imports
const Tag = require("../models/tagModel");
const request = require("supertest");
const app = require("../app");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWY3OGRmZDcxOGE3ODk2NDhjYTk1NSIsImlhdCI6MTY4Mzk3ODQ2MywiZXhwIjoxNjg2NTcwNDYzfQ.RXWne_pcsU5kAMg-WLg8-ZvYoBm6bD3BGv4AMwzzvi8";

describe("GET /api/v1/tag", () => {
  it("Responds with a JSON array of tasks", (done) => {
    request(app)
      .get("/api/v1/tag")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Array);
        done();
      });
  });
});

describe("POST /api/v1/tag", () => {
  it("Creates a new tag and responds with the new tag object", (done) => {
    const newTag = {
      name: "new",
    };

    request(app)
      .post("/api/v1/tag")
      .set("Authorization", `Bearer ${token}`)
      .send(newTag)
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.name).toBe(newTag.name);
        done();
      });
  });
});

describe("PUT /api/v1/tag/:id", () => {
  it("Updates a tag and responds with a 200 status code", async () => {
    const tag = await Tag.findOne();
    const updatedTag = { name: "Updated tag" };
    const res = await request(app)
      .put(`/api/v1/tag/${tag._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedTag)
      .expect(200);
    expect(res.body.name).toEqual("Updated tag");
  });
});

describe("DELETE /api/v1/tag/:id", () => {
  it("Responds with a success message on successful deletion", async () => {
    const tag = await Tag.findOne();
    request(app)
      .delete(`/api/v1/tag/${tag._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Tag was deleted.");
      });
  });
});
