import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";

async function getAllTicketsTypes() {
  const ticketsTypes = await ticketRepository.findManyTicketsType();
  return ticketsTypes;
}

async function getAllTickets(userId: number) {
  const enrollment = await ticketRepository.findEnrollmentByUserId(userId);

  if(!enrollment) throw notFoundError();

  const tickets = await ticketRepository.findManyTickets(enrollment.id);

  if(!tickets) throw notFoundError();

  return tickets;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const enrollment = await ticketRepository.findEnrollmentByUserId(userId);

  if(!enrollment) throw notFoundError();

  const ticket = await ticketRepository.postTicket(ticketTypeId, enrollment.id);

  if(!ticket) throw notFoundError();
    
  return ticket;
}

const ticketsServices = {
  getAllTicketsTypes,
  getAllTickets,
  postTicket
};

export default ticketsServices;
