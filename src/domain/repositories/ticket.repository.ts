import TicketInfo from "../entities/ticket_info";

export default interface TicketRepository {
    getTicket(id:string):Promise<void>
}