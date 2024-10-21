import { Router } from "express";
import {
  getAllDataController,
  statsController,
  addDataController,
} from "../controllers";
import { validateNewData } from "../middlewares";

const router = Router();

router.get("/", getAllDataController);
router.get("/data/stats", statsController);
router.post("/data", validateNewData, addDataController);

export default router;
