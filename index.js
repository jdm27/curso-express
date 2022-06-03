const express = require('express');
//const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, boomErrorHandler, errorHandler } = require("./middlewares/error.handler");
const bp = require('body-parser');

const app = express();
const port = process.env.PORT || 3200;


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
//const IP = '192.168.0.32';


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


//midlewares
//app.use(cors(options));

app.use(express.json()); //midleware
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('port:' + port);

});


app.get('/', (req, res) => {
  res.send('Hi, this is my server in express');

});





