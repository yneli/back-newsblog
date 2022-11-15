import express from "express";
import mongoose from 'mongoose';
import  { FetchNews, getOneNews }  from "./controllers/NewsController.js";
import cors from "cors";
import { register, getMe, login } from "./controllers/UserController.js";
import { commentCreateValidation, registerValidation, loginValidation } from "./validations/validations.js";
import checkAuth from './utils/checkAuth.js';
import { FetchComment, getComments } from "./controllers/CommentController.js";
import { Server } from "socket.io";
import { msgCreate, msgGet, msgGetAllUsers, msgRoomCreate } from "./controllers/MsgController.js";
import { createServer } from 'http';
import MsgModel from "./models/Msg.js";

mongoose
 .connect('mongodb+srv://admin:admin@cluster0.efmiwsh.mongodb.net/blog?retryWrites=true&w=majority')
 .then(() => console.log('DB OK'))
 .catch((err) => console.log('DB ERROR', err));

const app = express();
app.use(express.json());
app.use(cors());
const httpServer = createServer(app);
httpServer.listen(4000, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('Server OK');
});

const io = new Server(httpServer, {
    cors: {
      origin: "*",
    }
  });
io.on('connection', (socket) => {
      socket.on("SendMsg", arg => {
        const doc = new MsgModel({
          text: arg.text,
          user: arg.userId,
          idRoom: arg.idRoom,
        });
        doc.save().then(() => {
          io.emit("message", arg)
        }); 
     })
});


app.post('/auth/register', registerValidation, register);
app.get('/auth/me', checkAuth, getMe);
app.post('/auth/login', loginValidation, login);

app.post('/news', FetchNews);
app.get('/news', FetchNews);
app.post('/getOneNews', checkAuth, getOneNews);

app.post('/comment/create', checkAuth, commentCreateValidation, FetchComment)
app.post('/comment/getComments', getComments);

app.post('/msg/createRoom', checkAuth, msgRoomCreate);
app.get('/msg/getUsers', checkAuth, msgGetAllUsers);
app.post('/msg/createMsg', checkAuth, msgCreate);
app.post('/msg/msgGet', checkAuth, msgGet);

