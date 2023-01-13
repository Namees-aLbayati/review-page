const express=require('express')
const app=express();
const PORT = process.env.PORT || 3001;
const path=require('path')
const livereload=require('livereload');
const connectLivereload=require('connect-livereload');
const uuid = require('./helpers/uuid');
const liveReloadServer=livereload.createServer();
var publicdir=path.join(__dirname,'public');
const {readAndAppend}=require('./helpers/util')
liveReloadServer.watch(publicdir)
var routes=require('./routes/index')
app.use(connectLivereload());
function topic(){
  var a=["UI",'UX']
  var indexRan=Math.floor(Math.random()*a.length*1+1-1)
  return a[indexRan]
}

const server = require('http').createServer(app)
const io = require('socket.io')(server);




var dataArr=[]
var fs=require('fs')
app.use(routes)
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
app.get('/reviewpage',(req,res)=>{
  res.sendFile(path.join(__dirname,('./public/pages/review.html')))
})
app.get('/chat',(req,res)=>{
  res.sendFile(path.join(__dirname,('./public/pages/chat.html')))
})
app.get('/advice',(req,res)=>{
  res.sendFile(path.join(__dirname,('./public/pages/advices.html')))
})
app.post('/api/ad',(req,res)=>{

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


server.listen(PORT,()=>{
    console.log('listening')
    
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