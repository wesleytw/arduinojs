import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as handpose from '@tensorflow-models/handpose'
import Webcam from 'react-webcam'
///////// NEW STUFF IMPORTS
import * as fp from "fingerpose";

const Home = () => {
  const [openCam, setopenCam] = useState(false)
  const [emogi, setemogi] = useState()
  const [score, setscore] = useState()
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

      ///////// NEW STUFF ADDED GESTURE HANDLING
      if (hands.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
        ]);
        const gesture = await GE.estimate(hands[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length == 2) {
          console.log(gesture.gestures);
          if (gesture.gestures[0].score > 5 || gesture.gestures[1].score > 5) {
            if (gesture.gestures[0].score > gesture.gestures[1].score) {
              setemogi('✌️')
              setscore(gesture.gestures[0].score)
            } else {
              setemogi('👍')
              setscore(gesture.gestures[1].score)
            }
          } else {
            setemogi()
          }

          // const confidence = gesture.gestures.map(
          //   (prediction) => prediction.confidence
          // );
          // const maxConfidence = confidence.indexOf(
          //   Math.max.apply(null, confidence)
          // );
          // console.log("gesture",gesture.gestures[maxConfidence].name);
        } else {
          setemogi()
        }
      }
      ///////// NEW STUFF ADDED GESTURE HANDLING

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
    }, 100);
  }
  useEffect(() => {
    runDetect()
  },[])

  async function draw(prediction, ctx) {
    if (prediction.length > 0) {
      prediction.forEach(prediction => {
        const landmarks = prediction.landmarks
        for (let i = 0; i < landmarks.length; i++) {
          const x = landmarks[i][0]
          const y = landmarks[i][1]
          ctx.beginPath()
          ctx.arc(x, y, 5, 0, 3 * Math.PI)
          ctx.fillStyle = "indigo"
          ctx.fill()
        }
      });
    }
  }


  return (
    <div className="flex flex-col justify-start items-center min-h-screen py-2 relative">
      <button onClick={() => setopenCam(prev => !prev)}>open?{`${openCam}`}</button>
      <div className=" absolute top-10 right-20 z-10 text-9xl">{emogi}</div>
      <p className="">{score}</p>
      {openCam && <Webcam ref={camRef} mirrored={false} className=" mt-20 absolute border-lg bg-teal-300" />}
      <canvas ref={canvaRef} className=" mt-20 absolute" />
    </div>
  )

}

export default Home
