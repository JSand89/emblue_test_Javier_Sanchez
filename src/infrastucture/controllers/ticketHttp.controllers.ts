import { Request,Response } from "express";
import interactors from "../../domain/interactors";


const ticketController = async (request:Request,response:Response)=>{
    const {query} = request
    if (typeof query.matricula == "string"){
    const tickets = await interactors.getTicketIntereactor(query.matricula)
    response.json({code:500,info:tickets})
    }else{
        return
    }
    
}

export default ticketController