import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";

async function getPaymentByTicketId(ticketId: number, userId: number) {
  const ticket = await checkUserTicket(ticketId, userId);
  const payment = await paymentRepository.getPayment(ticketId);

  if(!payment) throw notFoundError();

  return payment;
}

async function checkUserTicket(ticketId: number, userId: number) {
  const enrollment = await paymentRepository.getEnrollmentByUserId(userId);

  if(!enrollment) throw notFoundError();

  const ticket = paymentRepository.checkTicketUserMatch(ticketId, enrollment.id);

  if(!ticket) throw unauthorizedError();

  // return ticket.TicketType;
}

async function processTicket(userId: number, payment: any) {
  const ticket = await paymentRepository.getTicketByTicketId(payment.ticketId);

  if(!ticket) throw notFoundError();

  if(ticket.enrollmentId !== userId) {
    throw unauthorizedError();
  }

  const processedPayment = await paymentRepository.createPayment(userId, payment, ticket);
  return processedPayment;
}

const paymentsService = {
  getPaymentByTicketId,
  checkUserTicket,
  processTicket
};

export default paymentsService;
