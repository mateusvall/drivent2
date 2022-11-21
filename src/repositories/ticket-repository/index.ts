import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findManyTicketsType() {
  return prisma.ticketType.findMany();
}

async function findEnrollmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId: userId }
  });
}

async function findManyTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId: enrollmentId },
    include: {
      TicketType: true
    }
  });
}

async function postTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      status: TicketStatus.RESERVED,
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId
    },
    include: {
      TicketType: true
    }
  });
}

const ticketRepository = {
  findManyTickets,
  findManyTicketsType,
  findEnrollmentByUserId,
  postTicket
};

export default ticketRepository;
