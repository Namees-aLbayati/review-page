const router=require('express').Router();
router.post('/advice',(req,res)=>{
    console.log('post is firing here')
    res.json({status:200,message:'success'})
    })
    module.exports=router