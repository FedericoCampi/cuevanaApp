import app from './app.js';
import { connectDB } from './db.js';// DB connection
import cors from 'cors';

connectDB();

// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(cors());

app.listen(5000)
console.log('hol')