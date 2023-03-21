const express=require('express')
const app=express();
const serverless=require('serverless-http')
const PORT = process.env.PORT || 3001;
const path=require('path')
const router=express.Router()
const livereload=require('livereload');
const connectLivereload=require('connect-livereload');
const uuid = require('./helpers/uuid');
const bodyParser = require("body-parser"); 
router.use(bodyParser.json());
const liveReloadServer=livereload.createServer();
var publicdir=path.join(__dirname,'./dist')
const {readAndAppend, readFromFile}=require('./helpers/util')
liveReloadServer.watch(publicdir)
var routes=require('./routes/index.js')
app.use(connectLivereload());
function topic(){
  var a=["UI",'UX']
  var indexRan=Math.floor(Math.random()*a.length*1+1-1)
  return a[indexRan]
}
const server = require('http').createServer(app)
const io = require('socket.io')(server);

var dataArr=[]
var fs=require('fs');
app.use(routes)
app.use(router)
app.use(express.static(publicdir));
app.use(express.json())
app.use(express.urlencoded({extended:true}));
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./dist/index.html'))
})
router.post('/api',(req,res)=>{

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
      const parsedReviews = JSON.parse(data);

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
router.get('/reviewpage',(req,res)=>{
  console.log(path.join(__dirname,('./dist/pages/review.html')))
  res.sendFile(path.join(__dirname,('./dist/pages/review.html')))
})
router.get('/chat',(req,res)=>{
  res.sendFile(path.join(__dirname,('./dist/pages/chat.html')))
})
router.get('/advice',(req,res)=>{
  res.sendFile(path.join(__dirname,('./dist/pages/advices.html')))
})
router.post('/try',(req,res)=>{

  console.log(req.body,'req.body')
    var data={
      username:req.body.username,
      tip:req.body.tip,
      tip_id:uuid(),
      topic:topic()
    }
   
readAndAppend(data,'./db/advice.json')
res.json({message:"your advice has been added!!!Thanks"})

})
router.get('/project',(req,res)=>{
  

  fs.readFile('./db/projects.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedReviews = JSON.parse(data);
      res.json(parsedReviews)
    }
  })
})







var numberOfUsers = 0;

io.on('connection', (socket) => {
	var userJoined = false;
	
	socket.on('new_message', (msg) => {
		socket.broadcast.emit('new_message', {
			username: socket.username,
			message: msg
		});
	});
	
	socket.on('user_added', (username) => {
		if (userJoined) return;

		socket.username = username;

		userJoined = true;
		
		numberOfUsers++;
		
		socket.emit('login', {
			numberOfUsers: numberOfUsers
		});
		
		socket.broadcast.emit('user_joined', {
			username: socket.username,
			numberOfUsers: numberOfUsers
		});
	});

	socket.on('typing', () => {
		socket.broadcast.emit('typing', {
			username: socket.username
		});
	});
	
	socket.on('typing_stop', () => {
		socket.broadcast.emit('typing_stop', {
			username: socket.username
		});
	});

	socket.on('disconnect', () => {
		if (userJoined) {
			--numberOfUsers;
			
			socket.broadcast.emit('user_left', {
				username: socket.username,
				numberOfUsers: numberOfUsers
			});
		}
	});
});

app.listen(PORT,()=>{
  console.log('listening')
  
})