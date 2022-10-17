import axios from "axios";
import fetch from 'node-fetch'
import { response } from "express";



export const FetchNews = async(req,res) => {
    
    try {
        
        const anyWord = await req.body.text;
        console.log(anyWord);
        const response = await fetch(`https://newsapi.org/v2/everything?q=${anyWord}&apiKey=cfd726ce9fe54e7ba45602fd5cc8aec9`).then(d => d.json()).then(response => {
            res.json(
                {newData: response})
        })

    } catch (error) {
        if(error.response){
            console.log(error)
        }

    }
}

export const getOneNews = async(req,res) => {
    
    try {
        console.log(req.id);
        const anyWord = await req.body.text;
        console.log(anyWord);
        const response = await fetch(`https://newsapi.org/v2/everything?q=${anyWord}&apiKey=cfd726ce9fe54e7ba45602fd5cc8aec9`).then(d => d.json());
        
        const filter = response.articles.filter((obj) => obj.publishedAt === req.body.id);
        res.json(filter)

    } catch (error) {
        if(error.response){
            console.log(error)
        }

    }
}



