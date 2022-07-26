import { Request,Response } from "express";
import SensorInput from "../../domain/entities/sensor_input";
import TicketInfo from "../../domain/entities/ticket_info";
import saveTicketInfo from "../../domain/interactors/index";

const sensorInputController = async (request:Request,response:Response)=>{
    const {body} = request;
    const info:SensorInput = 
    {registration:body.registration,
    localization:body.localization,
    heigh:body.heigh,
    velocity:body.velocity,
    city:body.city,
    image:body.image
    }
    const ticket:TicketInfo = await saveTicketInfo(info);
    response.json(ticket);
}

export default sensorInputController;