const express=require('express')
const { CLIENT_RENEG_LIMIT } = require('tls')
const app=express()
const http=require('http').createServer(app)


const PORT=process.env.PORT|| 9000
http.listen(PORT,()=>{
    console.log(`listening on port${PORT}`)
})
app.use(express.static(__dirname +'/public'))


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})
//socket
const io=require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log('Conecting......')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})


