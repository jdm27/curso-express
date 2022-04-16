const express = require('express');
//const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, boomErrorHandler, errorHandler } = require("./middlewares/error.handler");

const app = express();
const port = 3200;
//const IP = '192.168.0.32';

app.use(express.json()); //midleware
/*
const whitelist = ['http://127.0.0.1:5500', 'http://localhost:5500'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'), false);
    }
  }
}
*/

routerApi(app);

//app.use(cors(options));
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('port:' + port);

});


app.get('/', (req, res) => {
  res.send('Hi, this is my server in express');

});





