import express from 'express';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('./public')); // estilos e imágenes

//vista y filtrado de busqueda
app.get('/', (req, res) => {
  let profesores = [];
  res.render('index', { profesores });
});

//recibe datos del parametro
// app.post('/', (req, res) => {
//   const {nombre, edad, modulo, pi} = req.body;
//   const newProfesor = new Profesor(nombre, edad, modulo, pi)

//   res.render('index', {profesores: [...profesores, newProfesor]});
// });

//vista del form
app.get('/form', (req, res) => {
  res.render('form');
});

//puerto escuchando
app.listen(8080, () => {
  console.log('Servidor started');
});
