const express = require('express');
const app = express();
const movieRoutes = require('./routes/movies');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket)=>{
    console.log('user is connected');
    socket.emit('message', {message:'Salamu Alaykum'});
})
app.use(express.json());

mongoose.connect(db, {useNewUrlParser:true})
.then(()=>console.log("app connected to mongodb"))
.catch((err)=>console.log("error connecting to mongodb : "+err));

app.use('/api/movies', movieRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{ res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) })
}

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`app running on port ${port}`))
