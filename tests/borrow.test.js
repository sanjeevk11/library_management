import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import Book from "../models/book.model.js";
import Member from "../models/member.model.js";
import Borrow from "../models/borrow.model.js";

let bookId;
let memberId;

beforeAll(async () => {
  const uri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_URI_TEST
      : process.env.MONGO_URI;

  await mongoose.connect(uri);
});

beforeEach(async () => {
  await Book.deleteMany({});
  await Member.deleteMany({});
  await Borrow.deleteMany({});

  const book = await Book.create({
    title: "Test Book",
    author: "Test Author",
    copies: 2,
    available_copies: 2,
  });

  const member = await Member.create({
    name: "Test Member",
    email: "test@example.com",
  });

  bookId = book._id;
  memberId = member._id;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Borrow API", () => {
  it("should borrow a book", async () => {
    const res = await request(app)
      .post("/api/transactions/borrow")
      .send({ book_id: bookId, member_id: memberId });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("should return a book", async () => {
    // Borrow first
    const borrowRes = await request(app)
      .post("/api/transactions/borrow")
      .send({ book_id: bookId, member_id: memberId });

    const borrowId = borrowRes.body._id;

    // Now return
    const res = await request(app)
      .put(`/api/transactions/return/${borrowId}`)
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body.return_date).not.toBeNull();
  });

  it("should fail if already returned", async () => {
    const borrowRes = await request(app)
      .post("/api/transactions/borrow")
      .send({ book_id: bookId, member_id: memberId });

    const borrowId = borrowRes.body._id;

    await request(app).put(`/api/transactions/return/${borrowId}`).send();

    const res = await request(app)
      .put(`/api/transactions/return/${borrowId}`)
      .send();

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Book already returned");
  });

  it("should borrow with another member (second copy)", async () => {
    // First member borrows
    await request(app)
      .post("/api/transactions/borrow")
      .send({ book_id: bookId, member_id: memberId });

    // Create another member
    const member2 = await Member.create({
      name: "Second Member",
      email: "second@example.com",
    });

    // Second borrow succeeds
    const res = await request(app)
      .post("/api/transactions/borrow")
      .send({ book_id: bookId, member_id: member2._id });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });
});
