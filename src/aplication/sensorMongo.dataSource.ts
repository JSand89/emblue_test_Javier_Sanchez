import { MongoClient } from "mongodb";
import { env } from "process";
import SensorInput from "../domain/entities/sensor_input";
import TicketInfo from "../domain/entities/ticket_info";
import SensorRepository from "../domain/repositories/sensor.repository";
import ticketParameters from "../ticketParamerts.json";

export default class SensorMongo implements SensorRepository {
    public async postTicket(info: SensorInput): Promise<TicketInfo> {
       if (info.heigh > ticketParameters.maxHeight || info.velocity > ticketParameters.maxVelocity){
         const ticket =  this.insertSensorInformation(info)
        return ticket
       } else{
        const ticket = this.notATicket(info)
        return ticket
       }
        //? this.insertSensorInformation(info) : this.notATicket;
        //return ticket
    }

    private async insertSensorInformation(info:SensorInput):Promise<TicketInfo>{
        const url = `mongodb+srv://developertest:<${env.password}>@cluster0.ty5um.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(url);
        try{
            const database = client.db("insertDB");
            const tickerInfo = database.collection<SensorInput>("Sensor-input");
            const result = await tickerInfo.insertOne(info);
            console.log(`information inserted with the id: ${result.insertedId}`);
            const ticket:TicketInfo = {
                registration:info.registration,
                info:{
                    distance:0,
                    isValid:true,
                    cityAssingned:'',
                    pay:false
                }
            } 
            return ticket
        }finally{
            await client.close();
        }
    }

    private notATicket(info:SensorInput):TicketInfo{
        const ticket:TicketInfo = {
            registration:info.registration,
            info:{
                distance:0,
                isValid:false,
                cityAssingned:'',
                pay:false
            }
        } 
        return ticket
    }
}