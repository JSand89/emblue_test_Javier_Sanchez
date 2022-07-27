import express from 'express';
import bodyParser from 'body-parser';
import sensorInputController from './infrastucture/controllers/sensorInputHttp.controller';
import dotEnv from 'dotenv';
import sensorValidatorInput from './infrastucture/middleware/sensorInfo.middleware';
import ticketController from './infrastucture/controllers/ticketHttp.controllers'
dotEnv.config();
const PORT = process.env.PORT ||  8080;

const app = express();

//middlewares
app.use(bodyParser.json());


//routes
app.post('/multas/levantarmulta',sensorValidatorInput,sensorInputController);

app.get('/multas', ticketController);//add get ticket controller
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});


