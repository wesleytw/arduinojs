// import { Server } from 'Socket.IO'
const Server = require('socket.io')
var five = require('johnny-five')
const { Motor, IMU } = require("johnny-five");
// var board = new five.Board({ port: "/dev/tty.usbserial-10" })
var board = new five.Board({ port: "/dev/cu.usbserial-110" })
let sock
function update(res) {
  const io = new Server(res.socket.server)
  res.socket.server.io = io
  //board.on包io.on會搶頻  比較慢ready
  let isReady = false
  let led
  let servo
  let motor
  board.on('ready', function () {
    console.log("board ready")
    isReady = true
    if (sock) sock.broadcast.emit('isReady', isReady)
    led = new five.Led(13);
    led.off();
    servo = new five.Servo({
      pin: 10,
    });
    motor = new Motor({
      pins: {
        pwm: 5,
        dir: 6
      }
    });
    motor.on("start", () => {
      console.log(`start: ${Date.now()}`);
    });

    motor.on("stop", () => {
      console.log(`automated stop on timer: ${Date.now()}`);
    });

    motor.on("forward", () => {
      console.log(`forward: ${Date.now()}`);
      // board.wait(5000, () => motor.reverse(50));
    });

    motor.on("reverse", () => {
      console.log(`reverse: ${Date.now()}`);
      // board.wait(5000, motor.stop);
    });
    // motor.forward(255);
    // motor.stop()


    const imu = new IMU({
      controller: "MPU6050"
    });
    imu.on("change", () => {
      if (sock) sock.emit('updateMpu', {
        celsius: imu.thermometer.celsius,
        aroll: imu.accelerometer.roll,
        aacceleration: imu.accelerometer.acceleration,
        ainclination: imu.accelerometer.inclination,
        aorientation: imu.accelerometer.orientation,
        gx: imu.gyro.x,
        gy: imu.gyro.y,
        gz: imu.gyro.z,
        gpitch: imu.gyro.pitch,
        groll: imu.gyro.roll,
        gyaw: imu.gyro.yaw,
      })
    });
  });


  io.on('connection', function (socket) {
    console.log("io connected")
    sock = socket
    if (isReady) socket.broadcast.emit('isReady', isReady)
    socket.on('ledChange', function (data) {
      socket.broadcast.emit('updateLed', data)
      console.log(data);
      if (isReady != false) {
        // console.log("data", data);
        led.toggle();
      }
    });
    socket.on('servoChange', function (data) {
      socket.broadcast.emit('updateServo', data)
      // console.log(typeof data, data);
      if (data && isReady != false) {
        servo.to(+(data));
      }
    });
    socket.on('motorChange', function (data) {
      // socket.broadcast.emit('updateMotor', data)
      console.log("motorChange",typeof data, data);
      if (motor&&data && isReady != false) {
        if (data.act == "forward") {
          console.log("io f")
          // motor.forward(data.vel);
          board.wait(10, () => motor.forward(data.vel))
        } else if (data.act == "reverse") {
          console.log("io r")
          // motor.reverse(data.vel);
          board.wait(10, () => motor.reverse(data.vel))
        } else if (data.act == "stop") {
          console.log("io s")
          board.wait(10, () => motor.stop())
        }
      }
    });
  });
}

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
    update(res)
  } else {
    console.log('Socket is initializing')
    update(res)
  }
  res.end()
}

export default SocketHandler