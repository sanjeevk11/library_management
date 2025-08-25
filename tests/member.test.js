import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../server.js";
import Member from "../models/member.model.js";

dotenv.config();

let memberId;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  await Member.deleteMany();
});

afterAll(async () => {
  // Only close if we opened the connection
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});

describe("Member API", () => {
  it("should create a member", async () => {
    const res = await request(app)
      .post("/api/members")
      .send({ name: "John Doe", email: "john@test.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    memberId = res.body._id;
  });

  it("should fetch all members", async () => {
    const res = await request(app).get("/api/members");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should fetch single member", async () => {
    const res = await request(app).get(`/api/members/${memberId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("John Doe");
  });

  it("should update a member", async () => {
    const res = await request(app)
      .put(`/api/members/${memberId}`)
      .send({ name: "Jane Doe" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Jane Doe");
  });

  it("should delete a member", async () => {
    const res = await request(app).delete(`/api/members/${memberId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Member deleted");
  });
});
