import { Request,Response } from "express";
import interactors from "../../domain/interactors";


const ticketController = async (request:Request,response:Response)=>{
    const {query} = request
    if (typeof query.matricula == "string"){
    const tickets = await interactors.getTicketIntereactor(query.matricula);
    response.statusCode = 500;
    response.json(tickets);
    }else{
        return response.statusCode = 404;
    }
    
}

export default ticketController;