import { MongoClient } from "mongodb";
import { env } from "process";
import SensorInput from "../domain/entities/sensor_input";
import TicketInfo from "../domain/entities/ticket_info";
import SensorRepository from "../domain/repositories/sensor.repository";
import ticketParameters from "./ticketParameters";

export default class SensorMongo implements SensorRepository {
    public async postTicket(info: SensorInput): Promise<TicketInfo> {
       if (info.heigh > ticketParameters.maxHeight || info.velocity > ticketParameters.maxVelocity){
         const ticket =  this.insertSensorInformation(info);
        return ticket;
       } else{
        const ticket = this.notATicket(info);
        return ticket;
       }
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
                    distance:this.cityTicket(info.localization).distance,
                    isValid:true,
                    cityAssingned:this.cityTicket(info.localization).city,
                    pay:false
                }
            } 
            return ticket;
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
        return ticket;
    }

    private cityTicket(location:[number,number]):({city:string,distance:number}){
        const distanceToCity = 
        {"nort":this.distanceToCity(location,ticketParameters.citys.nort),
        "south":this.distanceToCity(location,ticketParameters.citys.south),
        "east":this.distanceToCity(location,ticketParameters.citys.east),
        "west":this.distanceToCity(location,ticketParameters.citys.west)}

        if(distanceToCity.nort > distanceToCity.east && distanceToCity.nort > distanceToCity.south && distanceToCity.nort > distanceToCity.west){
            return {city:'nort',distance:distanceToCity.nort};
        } else if (distanceToCity.east > distanceToCity.south && distanceToCity.east > distanceToCity.west){
            return {city:"east",distance:distanceToCity.east};
        } else if(distanceToCity.south > distanceToCity.west){
            return {city:"south",distance:distanceToCity.south};
        }else return {city:"west", distance:distanceToCity.west}
    }

    private distanceToCity(location:[number,number],city:[number,number]):number{
        return Math.pow( Math.pow(city[0]-location[0],2)-Math.pow(city[1]-location[1],2) ,1/2);
    }
}