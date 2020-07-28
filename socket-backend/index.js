const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

var captainData = null
let rideInProgressSocket = null
let startTaxiSocket = null
let carSocket = null
let adminSocket = null
let taxiSocket = null
let passengerSocket = null

io.on("connection", socket => {
  console.log(' hello ')

  socket.on('adminSocket', () => {
    console.log("adminSocket connected")
    adminSocket = socket
  })


  socket.on('carApprove', () => {
    if (carSocket !== null) {
      console.log('approved')
      carSocket.emit('carApproved')
      adminSocket = null
      carSocket = null
    }
  })

  socket.on('carDeny', () => {
    if(carSocket !== null){
      carSocket.emit('carDeny')
      carSocket= null
      adminSocket = null
    } 
  })


  socket.on('addCar', car => {
    carSocket = socket
    console.log(car)
    if (adminSocket !== null) {
      adminSocket.emit('addCar', car)
    }
  })


  socket.on('acceptRide', id => {
    if (searchRide !== null) {
      console.log('connected ride')
      searchRide.emit('acceptedRequest', id)
    }
  })

  socket.on("passengerRequest", data => {
    captainData = data
    console.log("Someone wants a passenger!");
    taxiSocket = socket;
  });

  socket.on("taxiRequest", taxiRoute => {
    console.log("Someone wants a taxi!");
    passengerSocket = socket
    if (taxiSocket !== null) {
      console.log('not null')
      taxiSocket.emit("taxiRequest", taxiRoute);
      taxiSocket = null
    }
  });
  socket.on('accept', captain => {
    if (passengerSocket != null) {
      passengerSocket.emit('accepted', captain)
      passengerSocket = null
    }
  })

  socket.on('startTaxiSocket', () => {
    startTaxiSocket = socket
  })

  socket.on("startRide", () => {
    console.log('start ride')
    if (startTaxiSocket !== null) {
      startTaxiSocket.emit("startRide");
      startTaxiSocket = null
    }
  })

  socket.on('rideInProgressSocket', () => {
    rideInProgressSocket = socket
  })
  socket.on('endRide', fare => {
    if (rideInProgressSocket !== null) {
      rideInProgressSocket.emit('endRide', fare)
    }
  })
  socket.on('rideCompleted', () => {
    
  })

  socket.on('endSession', () => {
    console.log('collected')
    if (rideInProgressSocket != null) {
      console.log('emited end session')
      rideInProgressSocket.emit('endSession')
    }
  })

});

server.listen(port, () => console.log("server running on port:" + port));