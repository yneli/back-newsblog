import CommentModel from "../models/Comment.js";



export const FetchComment = async(req,res) => {
    
    try {  
        const doc = new CommentModel({
            text: req.body.text,
            user: req.userId,
            url: req.body.url,
        });
        
        const chat = await doc.save();
        const posts = await CommentModel.find({url:req.body.url}).populate('user').exec();
        res.json(posts);

    } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Не удалось оправить сообщение в чат',
        });
      }
    };

export const getComments = async(req, res) => {
      try {
        const posts = await CommentModel.find({url:req.body.url}).populate('user').exec();
  
        res.json(posts)
      } catch (error) {
        console.log(err);
        res.status(500).json({
          message: 'Не удалось получить комментарии',
        });
      }
    };


    