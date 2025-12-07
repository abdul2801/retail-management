import express from "express";
import { fetchSales, fetchSummary , getSalesFiltersController} from "../controllers/sales.controller.js";

const router = express.Router();

router.get("/", fetchSales);
router.get("/summary", fetchSummary);
router.get("/filters", getSalesFiltersController);

export default router;
