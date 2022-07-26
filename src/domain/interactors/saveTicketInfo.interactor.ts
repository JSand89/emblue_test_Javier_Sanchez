import SensorInput from "../entities/sensor_input";
import TicketInfo from "../entities/ticket_info";
import SensorRepository from "../repositories/sensor.repository";

const saveTicketInfo =(sensorRepository:SensorRepository) => 
async (info:SensorInput): Promise<TicketInfo> =>{
    //save ticket info   
    const ticket = await sensorRepository.postTicket(info) 
    //return ticket info

    return ticket;
}

export default saveTicketInfo;