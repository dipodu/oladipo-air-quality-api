import { Router } from "express";
import {
  getAllDataController,
  statsController,
  addDataController,
} from "../controllers";

const router = Router();

router.get("/", getAllDataController);
router.get("/data/stats", statsController);
router.post("/data", addDataController);

export default router;
