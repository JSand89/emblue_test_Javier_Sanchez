import express from 'express';
import bodyParser from 'body-parser';
import sensorInputController from './infrastucture/controllers/sensorInputHttp.controller';
import dotEnv from 'dotenv';
import sensorValidatorInput from './infrastucture/middleware/sensorInfo.middleware';

dotEnv.config();
const PORT = process.env.PORT ||  8080;

const app = express();

//middlewares
app.use(bodyParser.json());


//routes
app.post('/sensorinput',sensorValidatorInput,sensorInputController);

//app.get('/multas/levantarmulta/:matricula', TicketController);//add get ticket controller
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});