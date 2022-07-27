import { MongoClient } from "mongodb";
import TicketInfo from "../domain/entities/ticket_info";
import TicketRepository from "../domain/repositories/ticket.repository";

export default class TicketInformation implements TicketRepository {
    public async getTicket(id: string): Promise<any> {
        const client = new MongoClient(`mongodb+srv://developertest:${process.env.PASSWORDDB}@cluster0.ty5um.mongodb.net/?retryWrites=true&w=majority`);
        try{
            const database = client.db("emblue_test");
            const collection = database.collection<TicketInfo>("Sensor-input")
            const ticket = await collection.findOne<TicketInfo>({registration:id})
            return ticket
        }catch(error){
            console.error(error)
        }
        finally{
            await client.close()
        }
    } 
}