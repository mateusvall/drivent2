import { prisma } from "@/config";

async function getPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId: ticketId }
  });
}

async function getEnrollmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId: userId }
  });
}

async function checkTicketUserMatch(ticketId: number, enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId
    },
    include: {
      Enrollment: true,
      TicketType: {
        select: {
          price: true
        }
      }
    }

  });
}

async function getTicketByTicketId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
    include: {
      TicketType: true
    }
  });
}

async function createPayment(userId: number, payment: any, ticket: any) {
  return prisma.payment.create({
    data: {
      ticketId: payment.ticketId,
      value: ticket.TicketType.price,
      cardIssuer: payment.cardData.issuer,
      cardLastDigits: payment.cardData.number.slice(11)

    }
  });
}   

const paymentRepository = {
  getPayment,
  getEnrollmentByUserId,
  checkTicketUserMatch,
  getTicketByTicketId,
  createPayment
};
export default paymentRepository;
