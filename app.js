import express from 'express';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import Profesor from './entities/Profesor.js';
import { profesores } from './data/profesores.js';

app.set('view engine', 'ejs');
app.use(express.static('./public')); // estilos e imágenes

app.get('/', (req, res) => {
  let profesoresFiltrados = [];
  let busqueda = req.query.busqueda;
  if (busqueda) {
    for (let i = 0; i < profesores.length; i++) {
      let profesor = profesores[i];
      if (
        profesor.nombre.includes(busqueda) ||
        profesor.edad == busqueda ||
        profesor.modulo.includes(busqueda) ||
        profesor.pi == busqueda
      ) {
        profesoresFiltrados = [...profesoresFiltrados, profesor];
      }
    }
  } else {
    profesoresFiltrados = [...profesores];
  }
  res.render('index', { profesores: profesoresFiltrados });
});

//recibe datos del parametro
app.post('/', (req, res) => {
  const { nombre, edad, modulo, pi } = req.body;
  const newProfesor = new Profesor(nombre, edad, modulo, pi);

  res.render('index', { profesores: [...profesores, newProfesor] });
});

//vista del form
app.get('/form', (req, res) => {
  res.render('form');
});

//puerto escuchando
app.listen(8090, () => {
  console.log('Servidor started');
});
