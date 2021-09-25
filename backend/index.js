const express=require('express');
var cors = require('cors')
 
const app=express();
app.use(cors())
const port=5100;
const connecttomongo=require('./db');

connecttomongo();
app.use(express.json());

app.use('/api/notes',require('./routes/notes'));
app.use('/api/users',require('./routes/users'));

app.listen(process.env.PORT || port);