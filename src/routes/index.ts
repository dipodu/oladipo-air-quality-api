import { Router } from "express";
import { getAllDataController } from "../controllers/getAllDataController";
import { statsController } from "../controllers/statsController";

const router = Router();

router.get("/", getAllDataController);
router.get("/data/stats", statsController);

export default router;
