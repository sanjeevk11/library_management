import express from "express";
import { addMember, getMembers, getMember, updateMember, deleteMember } from "../controllers/member.controller.js";

const router = express.Router();

router.post("/", addMember);
router.get("/", getMembers);
router.get("/:id", getMember);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

export default router;
