import { MongoClient } from "mongodb";
import SensorInput from "../domain/entities/sensor_input";
import TicketInfo from "../domain/entities/ticket_info";
import SensorRepository from "../domain/repositories/sensor.repository";
import ticketParameters from "./ticketParameters";


export default class SensorInformation implements SensorRepository {
    public async postTicket(info: SensorInput): Promise<TicketInfo> {
       if ( info.velocity > ticketParameters.maxVelocity || info.heigh > ticketParameters.maxHeight){
         const ticket =  this.insertSensorInformation(info);
        return ticket;
       } else{
        const ticket = this.notATicket(info);
        return ticket;
       }
    }

    private async insertSensorInformation(info:SensorInput):Promise<TicketInfo>{
    
        const client = new MongoClient(`mongodb+srv://developertest:${process.env.PASSWORDDB}@cluster0.ty5um.mongodb.net/?retryWrites=true&w=majority`);
        try{
            const database = client.db("emblue_test");
            const tickerInfo = database.collection<TicketInfo>("Sensor-input");
            const {distance,city}= this.cityTicket(info.localization);
            const ticket:TicketInfo = {
                registration:info.registration,
                info:{
                    distance:distance,
                    isValid:true,
                    cityAssingned:city,
                    pay:false
                }
            }
            const result = await tickerInfo.insertOne(ticket);           
            console.log(`information inserted with the id: ${result.insertedId}`); 
            return ticket;
        }catch(error){
            console.error(error)
            const ticket:TicketInfo = {
                registration:info.registration,
                info:{
                    distance:this.cityTicket(info.localization).distance,
                    isValid:false,
                    cityAssingned:this.cityTicket(info.localization).city,
                    pay:false
                }
            } 
            return ticket
        }
        finally{
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
        return ticket;
    }

    private cityTicket(location:[number,number]):({city:string,distance:number}){
        const distanceToCity = 
        {"nort":this.distanceToCity(location,ticketParameters.citys.nort),
        "south":this.distanceToCity(location,ticketParameters.citys.south),
        "east":this.distanceToCity(location,ticketParameters.citys.east),
        "west":this.distanceToCity(location,ticketParameters.citys.west)}

        if(distanceToCity.nort < distanceToCity.east && distanceToCity.nort < distanceToCity.south && distanceToCity.nort < distanceToCity.west){
            return {city:'nort',distance:distanceToCity.nort};
        } else if (distanceToCity.east < distanceToCity.south && distanceToCity.east < distanceToCity.west){
            return {city:"east",distance:distanceToCity.east};
        } else if(distanceToCity.south < distanceToCity.west){
            return {city:"south",distance:distanceToCity.south};
        }else return {city:"west", distance:distanceToCity.west}
    }

    private distanceToCity(location:[number,number],city:[number,number]):number{
        return Math.pow( Math.pow(city[0]-location[0],2)+ Math.pow(city[1]-location[1],2) ,1/2);
    }
}