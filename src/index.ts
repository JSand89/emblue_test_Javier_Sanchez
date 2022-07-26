import express from 'express';
import bodyParser from 'body-parser';
import sensorInputController from './infrastucture/controllers/sensorInputHttp.controller';


const PORT = 8080;

const app = express();

app.use(bodyParser.json());

app.post('/sensorinput',sensorInputController);
//app.get('/multas/levantarmulta/:matricula', SensorInputController);//add get ticket controller
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});