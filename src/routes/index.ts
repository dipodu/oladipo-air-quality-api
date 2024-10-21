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

router.get("/", getAllDataController);
router.get("/data/stats", statsController);
router.post("/data", validateNewData, addDataController);
router.get("/data/filter", validatePMFilterData, filterDataController);
router.get("/:id", validateId, getDataByIdController);
router.put("/data/:id", validateId, validateNewData, updateDataController);
router.delete("/data/:id", validateId, deleteDataController);

export default router;
