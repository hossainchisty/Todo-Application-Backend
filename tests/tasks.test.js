// Basic Lib Imports
const Task = require("../models/taskModel");
const request = require("supertest");
const app = require("../app");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWY3OGRmZDcxOGE3ODk2NDhjYTk1NSIsImlhdCI6MTY4Mzk3ODQ2MywiZXhwIjoxNjg2NTcwNDYzfQ.RXWne_pcsU5kAMg-WLg8-ZvYoBm6bD3BGv4AMwzzvi8";

describe("GET /api/v1/tasks", () => {
  it("Responds with a JSON array of tasks", (done) => {
    request(app)
      .get("/api/v1/tasks")
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

describe("POST /api/v1/tasks", () => {
  it("Creates a new task and responds with the new task object", (done) => {
    const newTask = {
      title: "Buy groceries",
      description: "Milk, bread, eggs, and cheese",
      priorityLevel: "high",
    };

    request(app)
      .post("/api/v1/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send(newTask)
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.title).toBe(newTask.title);
        expect(res.body.description).toBe(newTask.description);
        expect(res.body.priority).toBe(newTask.priority);
        done();
      });
  });
});

describe("PUT /api/v1/tasks/:id", () => {
  it("Updates a task and responds with a 200 status code", async () => {
    const task = await Task.findOne();
    const updatedTask = {
      title: "Updated task",
      description: "This task has been updated",
    };
    const res = await request(app)
      .put(`/api/v1/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedTask)
      .expect(200);

    expect(res.body.title).toEqual("Updated task");
    expect(res.body.description).toEqual("This task has been updated");
  });
});

describe("DELETE /api/v1/tasks/:id", () => {
  it("Responds with a success message on successful deletion", async () => {
    const task = await Task.findOne();
    request(app)
      .delete(`/api/v1/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Task was deleted.");
      });
  });
});
