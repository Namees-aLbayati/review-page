const router=require('express').Router();
const {readFromFile,readAndAppend}=require('../helpers/util')
    router.get('/advice',(req,res)=>{
        readFromFile('./db/advice.json').then((data) =>{
    res.json(JSON.parse(data))})

    })
    module.exports=router
