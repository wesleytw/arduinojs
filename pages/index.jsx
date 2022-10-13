import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { BsArrowLeftCircle, BsArrowRightCircle, BsStopCircle } from 'react-icons/bs'
import * as tf from '@tensorflow/tfjs'
import * as handpose from '@tensorflow-models/handpose'
import Webcam from 'react-webcam'


let socket

const Home = () => {
  const [isReady, setisReady] = useState(false)
  const [led, setLed] = useState(false)
  const [servo, setServo] = useState('0')
  const [vmotor, setVmotor] = useState('0')
  const [motor, setMotor] = useState()
  const [mpu, setmpu] = useState({ celsius: 0, gx: 0, gy: 0, gz: 0, gpitch: { angle: 0 }, groll: { angle: 0 }, gyaw: { angle: 0 } })
  const [openCam, setopenCam] = useState(false)

  useEffect(() => {
    // socketInitializer()
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('isReady', () => {
      setisReady(true)
    })

    // socket.on('updateLed', msg => {
    //   setLed(msg)
    // })
    socket.on('updateServo', msg => {
      setServo(msg)
    })
    // socket.on('updateMotor', msg => {
    //   setMotor(msg)
    // })
    socket.on('updateMpu', msg => {
      setmpu(msg)
    })
  }

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    if (name == "led") {
      setLed(!led)
      console.log("led", led)
      socket.emit('ledChange', led)
    } else if (name == "servo" && (value <= 180 && value >= 0)) {
      setServo(value)
      socket.emit('servoChange', value)
    } else if (name == "motor" && (value <= 255 && value >= 0)) {
      setVmotor(value)
      // socket.emit('servoChange', value)
    }
  }

  useEffect(() => {
    if (!motor) return
    socket.emit('motorChange', { act: motor, vel: vmotor })
  }, [motor])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 relative">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => setopenCam(prev => !prev)}>open?{`${openCam}`}</button>
      {openCam && <Webcam className="w-64 border-lg bg-teal-300" />}
<canvas></canvas>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className=" mt-10 text-6xl font-bold">
          CubeSat{' '}
          <span className="text-blue-600" >
            Dashboard
          </span>
        </h1>
        <p className="mt-5 text-2xl">
          Status{' '}
          <code className={"rounded-md  p-3 font-mono text-lg" + (isReady ? " bg-emerald-300 text-emerald-600" : " bg-red-300 text-red-600")}>
            {isReady ? "Ready" : "Disconnected"}
          </code>
        </p>

        <div className="mt-16 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <div className=" w-52 text-slate-900">
            <p className=" text- font-mono font-bold text-blue-500">On-board LED (pin13)</p>
            <div className=" h-12 flex justify-center items-center">
              <input name="led" type="checkbox" className="toggle toggle-accent toggle-lg " checked={led} onChange={onChangeHandler} />
            </div>
          </div>
          <div className=" w-52 text-slate-900">
            <p className=" text- font-mono font-bold text-blue-500">Servo (pin10)</p>
            <input name="servo" type="number" placeholder="Type something"
              value={servo} onChange={onChangeHandler} max={180} min={0} step="10"
              className="h-12 w-full px-5 border border-gray-400 rounded-lg text-2xl"
            />
          </div>
          <div className=" w-52 text-slate-900 border-separate">
            <p className=" text- font-mono font-bold text-blue-500">Motor (in2-d5,in2-d6)</p>
            <div className="flex h-12">
              <BsArrowLeftCircle onClick={() => setMotor("forward")} className=" rounded-full cursor-pointer hover:bg-slate-200 h-full mr-1" fontSize={50} color="#000" />
              <input name="motor" type="number" placeholder="Type something"
                value={vmotor} onChange={onChangeHandler} max={255} min={0} step="10"
                className="h-12 px-5 border border-gray-400 rounded-lg text-2xl"
              />
              <BsArrowRightCircle onClick={() => setMotor("reverse")} className=" rounded-full cursor-pointer hover:bg-slate-200 h-full ml-1" fontSize={50} color="#000" />
              <BsStopCircle onClick={() => setMotor("stop")} className=" rounded-full cursor-pointer hover:bg-slate-200 h-full ml-1" fontSize={50} color="#000" />
            </div>
          </div>
        </div>
        <div className="mt-16 mb-4 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <p className=" text- font-mono font-bold text-blue-500">IMU MPU6050 (A4,A5)</p>
          <div className=" min-h-12 w-full border border-gray-400 text-slate-900 rounded-lg">
            <div className=" grid grid-cols-4 gap-4 text-2xl font-mono">
              <div className=" py-3">temp: <br />
                <div className=" mt-1 radial-progress bg-primary-content border-1 border-black text-primary " style={{ "--value": mpu.celsius, "--thickness": "10px" }}>{mpu.celsius}°C</div>
              </div>
              <div className=" py-3">x: <br />
                <div className=" mt-1 radial-progress bg-primary-content border-1 border-black text-primary " style={{ "--value": mpu.gx, "--thickness": "10px" }}>{mpu.gx}°</div>
              </div>
              <div className=" py-3">y: <br />
                <div className=" mt-1 radial-progress bg-primary-content border-1 border-black text-primary " style={{ "--value": mpu.gy, "--thickness": "10px" }}>{mpu.gy}°</div>
              </div>
              <div className=" py-3">z: <br />
                <div className=" mt-1 radial-progress bg-primary-content border-1 border-black text-primary " style={{ "--value": mpu.gz, "--thickness": "10px" }}>{mpu.gz}°</div>
              </div>
              <div className=" py-3">pitch: <br />
                <div className=" mt-1 radial-progress bg-primary-content border-1 border-black text-primary " style={{ "--value": mpu.gpitch.angle, "--thickness": "10px" }}>{mpu.gpitch.angle}°</div>
              </div>
              <div className=" py-3">roll: <br />
                <div className=" mt-1 radial-progress bg-primary-content border-1 border-black text-primary " style={{ "--value": mpu.groll.angle, "--thickness": "10px" }}>{mpu.groll.angle}°</div>
              </div>
              <div className=" py-3">yaw: <br />
                <div className=" mt-1 radial-progress bg-primary-content border-1 border-black text-primary " style={{ "--value": mpu.gyaw.angle, "--thickness": "10px" }}>{mpu.gyaw.angle}°</div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <p className="mx-16 text-3xl font-mono text-blue-500">attitude</p>
              <img src="/cube.png" alt="" className=" w-40 absolut top-10 left-10 mb-10" />
            </div>
          </div>
        </div>
      </main>
      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )

}

export default Home


{/* <a
            href="https://nextjs.org/docs"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
            <p className="mt-4 text-xl">
              Find in-depth information about Next.js features and its API.
            </p>
          </a> */}