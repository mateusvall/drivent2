import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query;

  if(!ticketId) {
    return res.status(httpStatus.BAD_REQUEST);
  }
  try{
    paymentsService.checkUserTicket(Number(ticketId), userId);
    const payment = await paymentsService.getPaymentByTicketId(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(payment);
  }catch(error) {
    if(error.name == "NotFoundError") {
      return res.status(httpStatus.NO_CONTENT);
    }
    if(error.name == "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED);
    }
  }
}

export async function processPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const payment  = req.body;

  if(!payment) res.status(httpStatus.BAD_REQUEST);

  try{
    const processedPayment = paymentsService.processTicket(userId, payment);
    return res.status(httpStatus.CREATED).send(processedPayment);
  }catch(error) {
    if(error.name == "NotFoundError") {
      return res.status(httpStatus.NO_CONTENT);
    }
    if(error.name == "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED);
    }
  }
}
