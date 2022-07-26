import SensorMongo from "../../useCase/sensorMongo.dataSource";
import saveTicketInfo from "./saveTicketInfo.interactor";


const sensorRepository = new SensorMongo()

export default saveTicketInfo(sensorRepository)