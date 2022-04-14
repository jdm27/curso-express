const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, boomErrorHandler, errorHandler } = require("./middlewares/error.handler");

const app = express();
const port = 3200;
//const IP = '192.168.0.32';

app.use(express.json()); //midleware
app.use(cors());

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('port:' + port);

});


app.get('/', (req, res) => {
  res.send('Hi, this is my server in express');

});



/*
app.get('/products/:id',(req,res)=>{
    const {id}=req.params;

    res.json({
        id,
        name: 'INTEL 1200 CORE I3 10100F',
        price:12999.99
    });
})
*/


