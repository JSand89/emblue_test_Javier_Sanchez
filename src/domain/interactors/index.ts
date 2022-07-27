import PostTicket from "../../useCase/sensor.dataSource";
import SaveTicketInfo from "./saveTicketInfo.interactor";
import TicketInformation from "../../useCase/ticket.dataSource";
import getTicketIntereactor from "./getTicketInfo.interactor";


const sensorRepository = new PostTicket()
const getTicket = new TicketInformation()
const interactors = {SaveTicketInfo:SaveTicketInfo(sensorRepository),getTicketIntereactor:getTicketIntereactor(getTicket)}
export default interactors


