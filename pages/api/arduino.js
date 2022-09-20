var five = require('johnny-five')
const {Board, IMU} = require('johnny-five');
// var board = new five.Board({ port: "/dev/tty.usbserial-10" })
var board = new five.Board({ port: "/dev/tty.usbserial-10" })

// ls /dev/tty.*

console.log("inited")

// export function go(i) {
  board.on("ready", function () {
    console.log("connected")
    // var led = new five.Led(13)
    // led.blink(50)


    // new five.Accelerometer({
    //   controller: "MPU6050",
    //   sensitivity: 16384 // optional
    // });
    const imu = new IMU({
      controller: "MPU6050",
      // sensitivity: 1
    });
    imu.on("change", () => {
      console.log("Thermometer");
      console.log("  celsius      : ", imu.thermometer.celsius);
      console.log("  fahrenheit   : ", imu.thermometer.fahrenheit);
      console.log("  kelvin       : ", imu.thermometer.kelvin);
      console.log("--------------------------------------");
  
      console.log("Accelerometer");
      console.log("  x            : ", imu.accelerometer.x);
      console.log("  y            : ", imu.accelerometer.y);
      console.log("  z            : ", imu.accelerometer.z);
      console.log("  pitch        : ", imu.accelerometer.pitch);
      console.log("  roll         : ", imu.accelerometer.roll);
      console.log("  acceleration : ", imu.accelerometer.acceleration);
      console.log("  inclination  : ", imu.accelerometer.inclination);
      console.log("  orientation  : ", imu.accelerometer.orientation);
      console.log("--------------------------------------");
  
      console.log("Gyroscope");
      console.log("  x            : ", imu.gyro.x);
      console.log("  y            : ", imu.gyro.y);
      console.log("  z            : ", imu.gyro.z);
      console.log("  pitch        : ", imu.gyro.pitch);
      console.log("  roll         : ", imu.gyro.roll);
      console.log("  yaw          : ", imu.gyro.yaw);
      console.log("  rate         : ", imu.gyro.rate);
      console.log("  isCalibrated : ", imu.gyro.isCalibrated);
      console.log("--------------------------------------");
    });
    
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