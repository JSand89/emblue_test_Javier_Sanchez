import express from 'express';
import bodyParser from 'body-parser';

const PORT = 8080;

const app = express();
app.use(bodyParser.json());

app.post('/sensorinput', );//add controller sensor input
app.get('/multas/levantarmulta/:matricula',);//add get ticket controller
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});