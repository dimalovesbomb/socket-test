const express = require("express");
const app = require("express")();
const httpServer = require("http").createServer(app);
const options = { /* ... */ };
const io = require("socket.io")(httpServer, options);

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(express.json());

let clients = new Set();

io.on("connection", socket => {
    clients.add(socket);
    // socket.onAny( (eventName, args) => {
    //     console.log(eventName, args);
    //     socket.emit('testSend', )
    // } )
    socket.on('from1to2', data => socket.emit('fromServerTo2', data));
    socket.on('from2to1', data => socket.emit('fromServerTo1', data));
    socket.once('disconnect', () => clients.delete(socket))
 });

httpServer.listen(2500, () => console.log('server works'));