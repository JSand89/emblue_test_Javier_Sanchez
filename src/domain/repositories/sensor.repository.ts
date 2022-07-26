import SensorInput from "../entities/sensor_input";
import TicketInfo from "../entities/ticket_info";

export default interface SensorRepository{
    postTicket(info:SensorInput): Promise<TicketInfo>;
}