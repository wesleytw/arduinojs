import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as handpose from '@tensorflow-models/handpose'
import Webcam from 'react-webcam'

const Home = () => {
  const [openCam, setopenCam] = useState(false)
  const camRef = useRef()
  const canvaRef = useRef()

  async function detect(net) {
    // console.log("cam", camRef)
    if (camRef.current && camRef.current.video?.readyState === 4 && net) {
      // console.log("camref", camRef.current.video.readyState === 4, camRef.current.video)
      const video = camRef.current.video
      const videoWidth = camRef.current.video.videoWidth   // video.videoWidth is the display window width.
      const videoHeight = camRef.current.video.videoHeight // camRef.current.video.width and height are 0.
      camRef.current.video.width = videoWidth              // Thus, TF doesn't know the actual width and height.
      camRef.current.video.height = videoHeight            // So we have set width to be the videoWidth.
      // console.log("canva", canvaRef)
      canvaRef.current.width = videoWidth
      canvaRef.current.height = videoHeight
      const hands = await net.estimateHands(video)
      // if (hands.length !== 0) { console.log("hands", hands) }
      const ctx = canvaRef.current.getContext("2d")
      // ctx.translate(videoWidth / 2, videoHeight / 2);
      // ctx.scale(-1, 1);
      draw(hands, ctx)
    }
  }
  async function runDetect() {
    const net = await handpose.load()
    console.log("hand model loaded")
    setInterval(() => {
      detect(net)
    }, 60);
  }
  useEffect(() => {
    runDetect()
  })

  async function draw(prediction, ctx) {
    if (prediction.length > 0) {
      prediction.forEach(prediction => {
        const landmarks = prediction.landmarks
        for (let i = 0; i < landmarks.length; i++) {
          const x = landmarks[i][0]
          const y = landmarks[i][1]
          ctx.beginPath()
          ctx.arc(x,y,5,0,3*Math.PI)
          ctx.fillStyle="indigo"
          ctx.fill()
        }
      });
    }
  }


  return (
    <div className="flex flex-col justify-start items-center min-h-screen py-2 relative">
      <button onClick={() => setopenCam(prev => !prev)}>open?{`${openCam}`}</button>
      {openCam && <Webcam ref={camRef} mirrored={false} className=" mt-10 absolute border-lg bg-teal-300" />}
      <canvas ref={canvaRef} className=" mt-10 absolute" />
    </div>
  )

}

export default Home
