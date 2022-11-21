import ticketsServices from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function listAllTicketsType(req: AuthenticatedRequest, res: Response) {
  const ticketsTypes = await ticketsServices.getAllTicketsTypes();
  res 
    .send(ticketsTypes)
    .sendStatus(httpStatus.OK);
}

export async function listAllTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try{
    const tickets = await ticketsServices.getAllTickets(userId);
    res.send(tickets).sendStatus(httpStatus.OK);
  } catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
} 

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;

  if(ticketTypeId == undefined) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try{
    const ticket = await ticketsServices.postTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

