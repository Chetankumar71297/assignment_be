import express from "express";
import trimRequest from "trim-request";
import { findUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/findUser/:userId", trimRequest.all, findUser);

export default router;
