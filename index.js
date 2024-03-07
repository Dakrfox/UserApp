// Importamos Express
const express = require('express');
const routerApi = require('./routes/index');

// Creamos una aplicación Express
const app = express();

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
