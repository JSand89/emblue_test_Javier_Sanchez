import { Request,Response } from "express";
import SensorInput from "../../domain/entities/sensor_input";
import TicketInfo from "../../domain/entities/ticket_info";
import interactors from "../../domain/interactors/index";

const sensorInputController = async (request:Request,response:Response)=>{
    const {body} = request;
    const {query} = request;
    console.log( typeof query.matricula)
    if(typeof query.matricula == 'string'){
        const info:SensorInput = 
        {registration:query.matricula,
        localization:body.localization,
        heigh:body.heigh,
        velocity:body.velocity,
        city:body.city || '',
        image:body.image
        }
        const ticket:TicketInfo = await interactors.SaveTicketInfo(info);
        response.json(ticket);
    }

}

export default sensorInputController;