import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/connectDB.js';
import auth from './middlewares/auth.js';

// routes handlers
import userHandler from './routes/usersRoute.js';
import taskHandler from './routes/tasksRoute.js';


const app=express();

// .env config
dotenv.config();

// MongoDB connection
connectDB();

// middleware
app.use(express.json());

// Routes
/* 
 login =            /api/user/login       (post)
 signup=            /api/user/signup      (post)

 alltasks     =      /api/task/            ?page=1&limit=5  (get)
 user's tasks =      /api/task/user        ?page=1&limit=5  (get)
 create task  =      /api/task/            (post)
 update       =      /api/task/:id         (put)
 specific task=      /api/task/:id         (get)
 delete task  =      /api/task/:id         (delete)
*/

app.use('/api/user',userHandler);
app.use('/api/task',taskHandler);

// server PORT
const PORT=process.env.PORT;

app.listen(PORT,()=>{console.log(`Server is listening on PORT ${PORT}.....`)});
