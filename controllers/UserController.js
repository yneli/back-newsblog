import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/User.js";


export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password,salt);


    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash
    });

    const user = await doc.save();

    const token = jwt.sign({
        _id: user._id,
    }, 'secret123',
    {
        expiresIn: '30d',
    }
    );

    res.json({
        ...user._doc,
        token
    })
    } catch (error) {
        res.json(error)
        console.log('ERROR');
    }
};


export const getMe = async (req, res) => {
    try {
      const user = await UserModel.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({
          message: 'Пользователь не найден',
        });
      }
  
      const { passwordHash, ...userData } = user._doc;
  
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Нет доступа',
      });
    }
  };

  export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if(!user) {
            return req.status(404).json({
                message: 'Пользователь не найден',
            })
        }
      const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

      if (!isValidPass) {
        return res.status(404).json({
            message: 'Неверный пароль'
        })
      }

      const token = jwt.sign({
        _id: user._id,
    }, 'secret123',
    {
        expiresIn: '30d',
    }
    );
    res.json({
        ...user._doc,
        token
    })

    } catch (error) {
        res.status(500).json({
            message: "123123"
        })
    }
};