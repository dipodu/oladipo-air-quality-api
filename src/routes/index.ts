import { Router } from "express";
import {
  getAllDataController,
  statsController,
  addDataController,
} from "../controllers";
import { validateNewData } from "../middlewares";
import { validatePMFilterData } from "../middlewares/validatePMFilterData";
import { filterDataController } from "../controllers/filterDataController";

const router = Router();

router.get("/", getAllDataController);
router.get("/data/stats", statsController);
router.post("/data", validateNewData, addDataController);
router.get("/data/filter", validatePMFilterData, filterDataController);

export default router;
