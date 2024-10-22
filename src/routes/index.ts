import { Router } from "express";
import {
  getAllDataController,
  statsController,
  addDataController,
  getDataByIdController,
  deleteDataController,
  updateDataController,
} from "../controllers";
import {
  validateNewData,
  validateId,
  validatePMFilterData,
} from "../middlewares";
import { filterDataController } from "../controllers";

const router = Router();

router.get("/data/stats", statsController);
router.get("/data/filter", validatePMFilterData, filterDataController);
router.post("/data", validateNewData, addDataController);
router.put("/data/:id", validateId, validateNewData, updateDataController);
router.delete("/data/:id", validateId, deleteDataController);
router.get("/data/:id", validateId, getDataByIdController);
router.get("/data", getAllDataController);

export default router;
