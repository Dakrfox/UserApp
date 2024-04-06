// Importamos Express
const express = require('express');
const routerApi = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Creamos una aplicación Express
const app = express();
app.use(bodyParser.json()); // For JSON bodies


mongoose.connect('mongodb://root:password@localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a la base de datos'))
.catch(err => console.error(err));


// Definimos una ruta GET para la raíz '/'
app.get('/', (req, res) => {
  // Enviamos una respuesta "Hola Mundo!" a la solicitud
  res.send('Hola Mundo!');
});
//app.use('/users', routerApi)
// Iniciamos el servidor en el puerto 3000
routerApi(app);
app.listen(3000, () => {
  console.log('Servidor Express escuchando en el puerto 3000');
});
