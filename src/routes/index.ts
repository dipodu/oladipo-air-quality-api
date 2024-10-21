import { Router } from "express";
import { getAllDataController } from "../controllers/getAllDataController";

const router = Router();

router.get("/", getAllDataController);

export default router;
