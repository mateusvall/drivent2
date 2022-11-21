import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentById, processPayment } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentById)
  .post("/process", processPayment);

export { paymentsRouter };
