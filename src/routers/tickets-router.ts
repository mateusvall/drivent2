import { listAllTickets, listAllTicketsType, postTicket } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", listAllTicketsType)
  .get("/", listAllTickets)
  .post("/", postTicket);
    
export { ticketsRouter };
