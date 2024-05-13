const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Connection = require('./config/db');

const userRouter = require('./routes/userRoute');
const blogRouter = require('./routes/blogRoute');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res) => {
    res.send('Welcome to server');
});

app.use('/api/v1/user',userRouter);
app.use('/api/v1/blog',blogRouter); 

Connection();

app.listen(process.env.PORT,() => {
    console.log(`Server started`);
})

