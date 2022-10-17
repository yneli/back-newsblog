import express from "express";
import mongoose from 'mongoose';
import  { FetchNews, getOneNews }  from "./controllers/NewsController.js";
import cors from "cors";
import { register, getMe, login } from "./controllers/UserController.js";
import { commentCreateValidation, registerValidation, loginValidation } from "./validations/validations.js";
import checkAuth from './utils/checkAuth.js';
import { FetchComment, getComments } from "./controllers/CommentController.js";



mongoose
 .connect('mongodb+srv://admin:admin@cluster0.efmiwsh.mongodb.net/blog?retryWrites=true&w=majority')
 .then(() => console.log('DB OK'))
 .catch((err) => console.log('DB ERROR', err));


 
 const app = express();
 app.use(express.json());
 app.use(cors());
 app.listen(4000, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('Server OK');
});

app.post('/auth/register', registerValidation, register);
app.get('/auth/me', checkAuth, getMe);
app.post('/auth/login', loginValidation, login);

app.post('/news', FetchNews);
app.get('/news', FetchNews);
app.post('/getOneNews', checkAuth, getOneNews);

app.post('/comment/create', checkAuth, commentCreateValidation, FetchComment)
app.post('/comment/getComments', getComments);

