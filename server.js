const express=require('express')
const app=express();
const PORT = process.env.PORT || 3001;
const path=require('path')
const livereload=require('livereload');
const connectLivereload=require('connect-livereload');
const uuid = require('./helpers/uuid');
const liveReloadServer=livereload.createServer();
var publicdir=path.join(__dirname,'public');
liveReloadServer.watch(publicdir)
app.use(connectLivereload());
var dataArr=[]
var fs=require('fs')

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'))
})
app.post('/api',(req,res)=>{

const uuidVal=uuid()
const newReview={
    name:req.body.name,
    email:req.body.email,
    rate:req.body.rate,
    review:req.body.review,
    id:uuidVal

 }

 fs.readFile('./db/reviews.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedReviews = JSON.parse(data);

      // Add a new review
      parsedReviews.push(newReview);

      // Write updated reviews back to the file
      fs.writeFile(
        './db/reviews.json',
        JSON.stringify(parsedReviews, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated reviews!')
      );
    }
  });





    res.status(201).json({
        message:"received from fetch",
        id:uuidVal
    });
})
app.get('/reviewpage',(req,res)=>{
  res.sendFile(path.join(__dirname,('./public/pages/review.html')))
})
app.get('/advice',(req,res)=>{
  res.sendFile(path.join(__dirname,('./public/pages/advices.html')))
})

app.listen(PORT,()=>{
    console.log('listening')
})
