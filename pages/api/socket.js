// import { Server } from 'Socket.IO'
const Server = require('socket.io')
var five = require('johnny-five')

// var board = new five.Board({ port: "/dev/tty.usbserial-10" })
var board = new five.Board({ port: "/dev/cu.usbserial-110" })

function update(res) {
  const io = new Server(res.socket.server)
  res.socket.server.io = io
  //board.on包io.on會搶頻  比較慢ready
  let led = undefined
  let isReady = false
  board.on('ready', function () {
    console.log("ready")
    isReady = true
    led = new five.Led(13);
    led.off();
  });
  io.on('connection', function (socket) {
    console.log("connected")
    socket.on('input-change', function (data) {
      socket.broadcast.emit('update-input', data)
      console.log(data);
      if (data != false && isReady != false) {
        led.toggle();
      }
    });
  });
  // });
}

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
    update(res)
  } else {
    console.log('Socket is initializing')
    update(res)
    // const io = new Server(res.socket.server)
    // res.socket.server.io = io
    // // board.on('ready', function () {
    // //   console.log("ready")

    // //   var led = new five.Led(13);
    // //   led.off();
    //   io.on('connection', function (socket) {
    //     console.log("connected")
    //     socket.on('input-change', function (data) {
    //       socket.broadcast.emit('update-input', data)
    //       console.log(data);
    //       if (data != false) {
    //         led.toggle();
    //       }
    //     });
    //   });
    // // });

  }
  res.end()
}

export default SocketHandler