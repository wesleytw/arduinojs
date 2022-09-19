var five = require('johnny-five')

// var board = new five.Board({ port: "/dev/tty.usbserial-10" })
var board = new five.Board({ port: "/dev/tty.usbserial-110" })

// ls /dev/tty.*

console.log("inited")

// export function go(i) {
  board.on("ready", function () {
    console.log("connected")
    var led = new five.Led(13)
    led.blink(50)
  })
// }


// export default async function handler(req, res) {
//   // if (req.method === 'POST') {
//     // try {
//       console.log("post",req.body.job)
//       // board.off()
//       board.on("ready", function () {
//         console.log("connected")
//         var led = new five.Led(13)
//         led.blink(req.body.job)
//       })
//       var led = new five.Led(13)
//         led.blink(req.body.job)
//       res.status(200).json("This is a response for POST.")
//     // } catch (error) {
//       // res.status(417).json(error)
//     // }
//   // } else if (req.method === 'GET') {
//     // res.status(200).json("This is a response for GET. Try to POST.")
//   // }
// }