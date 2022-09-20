import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

let socket;

const Home = () => {
  const [isReady, setisReady] = useState(false)
  const [led, setLed] = useState(false)
  const [servo, setServo] = useState('0')
  const [motor, setMotor] = useState('0')
  const [mpu, setmpu] = useState()

  useEffect(() => {
    socketInitializer()
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
    socket.on('updateMotor', msg => {
      setMotor(msg)
    })
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
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className=" -mt-10 text-6xl font-bold">
          {/* Welcome to{' '} */}
          Cubeset{' '}
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
          <div className=" w-52 text-slate-900">
            <p className=" text- font-mono font-bold text-blue-500">Motor (in2-d9,in2-d8)</p>
            <input name="servo" type="number" placeholder="Type something"
              value={motor} onChange={onChangeHandler} max={180} min={0} step="10"
              className="h-12 w-full px-5 border border-gray-400 rounded-lg text-2xl"
            />
          </div>
        </div>
        <div className="mt-16 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <p className=" text- font-mono font-bold text-blue-500">IMU MPU6050 (A4,A5)</p>
          <div className=" min-h-12 w-full border border-gray-400 text-slate-900 rounded-lg">
            {mpu &&
              <div className=" grid grid-cols-4 gap-4 text-2xl font-mono">
                <div className=" py-3">temp: {mpu.celsius} °C</div>
                <div className=" py-3">x: {mpu.gx}</div>
                <div className=" py-3">y: {mpu.gy}</div>
                <div className=" py-3">z: {mpu.gz}</div>
                <div className=" py-3">pitch: {mpu.gpitch.angle}°</div>
                <div className=" py-3">roll: {mpu.groll.angle}°</div>
                <div className=" py-3">yaw: {mpu.gyaw.angle}°</div>
              </div>
            }
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
          Powered by{' '}
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