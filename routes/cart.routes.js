import express from "express";
import * as cartController from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", cartController.createCart);
router.get("/:id", cartController.getCart);
router.post("/:id/items", cartController.addItem);

export default router; 