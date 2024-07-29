import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Ahorcado from './ahorcado.js';

const app = express();
const port = 3000;

let juego;

app.use(cors());
app.use(bodyParser.json());

app.post('/iniciar-juego', (req, res) => {
  const { dificultad, palabraIngresada } = req.body;
  juego = new Ahorcado(dificultad, palabraIngresada);
  res.json({ mensaje: 'Juego iniciado', estado: juego.estadoPartida() });
});

app.post('/arriesgar-letra', (req, res) => {
  const { letra } = req.body;
  const resultado = juego.arriesgarLetra(letra);
  res.json({ resultado, estado: juego.estadoPartida() });
});

app.post('/arriesgar-palabra', (req, res) => {
  const { palabra } = req.body;
  const resultado = juego.arriesgarPalabra(palabra);
  res.json({ resultado, estado: juego.estadoPartida() });
});

app.get('/vidas', (req, res) => {
  res.json({ vidas: juego.devuelveVidas() });
});

app.get('/estado', (req, res) => {
  res.json({ estado: juego.estadoPartida() });
});

app.get('/puntuacion', (req, res) => {
  res.json({ puntuacion: juego.calcularPuntuacion() });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
