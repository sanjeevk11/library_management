import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../server.js";
import Book from "../models/book.model.js";

dotenv.config();

let bookId;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  await Book.deleteMany();
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});

describe("Book API", () => {
  it("should create a book", async () => {
    const res = await request(app)
      .post("/api/books")
      .send({ title: "1984", author: "Orwell", copies: 5 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    bookId = res.body._id;
  });

  it("should fetch all books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should fetch single book", async () => {
    const res = await request(app).get(`/api/books/${bookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("1984");
  });

  it("should update a book", async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .send({ copies: 10 });
    expect(res.statusCode).toBe(200);
    expect(res.body.copies).toBe(10);
  });

  it("should delete a book", async () => {
    const res = await request(app).delete(`/api/books/${bookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Book deleted");
  });
});
