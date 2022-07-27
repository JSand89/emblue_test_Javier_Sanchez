import express from 'express';
import bodyParser from 'body-parser';
import sensorInputController from './infrastucture/controllers/sensorInputHttp.controller';
import dotEnv from 'dotenv';

dotEnv.config();
const PORT = process.env.PORT ||  8080;

const app = express();

//middlewares
app.use(bodyParser.json());


//routes
app.post('/sensorinput',sensorInputController);
//app.get('/multas/levantarmulta/:matricula', SensorInputController);//add get ticket controller
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});