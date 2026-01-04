import express from "express";
import {updateMenu,getMenuByDay,getWeeklyMenu,} from "../controllers/menu.controller.js";

import {protect} from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

/* Admin */
router.post("/",protect,roleMiddleware("admin"),updateMenu);

/* Student + Admin */
router.get("/", protect, getMenuByDay);
router.get("/weekly", protect, getWeeklyMenu);

export default router;
