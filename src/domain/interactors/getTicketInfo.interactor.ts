import TicketRepository from "../repositories/ticket.repository";

const getTicketIntereactor = (ticketRepository:TicketRepository) =>
async (id:string):Promise<void> => {
    const ticket = await ticketRepository.getTicket(id);
    return ticket;
}

export default getTicketIntereactor;