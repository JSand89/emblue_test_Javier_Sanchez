import { MongoClient } from "mongodb";
import TicketInfo from "../domain/entities/ticket_info";
import TicketRepository from "../domain/repositories/ticket.repository";

export default class TicketInformation implements TicketRepository {
    public async getTicket(id: string): Promise<any> {
        const client = new MongoClient(`mongodb+srv://developertest:${process.env.PASSWORDDB}@cluster0.ty5um.mongodb.net/?retryWrites=true&w=majority`);
        try{
            const database = client.db("emblue_test");
            const collection = database.collection<TicketInfo>("Tickets");
            const ticket =  collection.find<TicketInfo>({registration:id});
            const tickets = await ticket.toArray()
            //console.log(tickets)
            return  this.filterTickets(tickets);
            
        }catch(error){
            console.error(error);
        }
        finally{
            await client.close();
        }
    }
    private async  filterTickets(tickets:Array<TicketInfo>):Promise<any> {
        if (tickets.length != 0){
            const  jsontickets = {
                multasPagas:tickets.filter(ticket => ticket.info.pay),
                multasNoPagas:tickets.filter(ticket => !ticket.info.pay)
            }
            return  jsontickets;
        
        }else{
            return {info:"No tickets found"}
        }
    }
}