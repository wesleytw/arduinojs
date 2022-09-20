import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

let socket;

const Home = () => {
  const [input, setInput] = useState('')

  useEffect(() => {
    socketInitializer()
  }, [])
  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', msg => {
      setInput(msg)
    })
  }

  const onChangeHandler = (e) => {
    setInput(e.target.value)
    socket.emit('input-change', e.target.value)
  }



  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div class="space3d">
        <div class="box">
          <div class="front">F</div>
          <div class="back">B</div>
          <div class="top">T</div>
          <div class="bottom">BT</div>
          <div class="left">L</div>
          <div class="right">R</div>
        </div>
      </div> */}
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{' '}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
            pages/index.tsx
          </code>
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a
            href="https://nextjs.org/docs"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
            <p className="mt-4 text-xl">
              Find in-depth information about Next.js features and its API.
            </p>
          </a>
          <div className=" text-slate-900">
            <p className=" text-blue-500">On-board LED</p>
            <input
              placeholder="Type something"
              value={input}
              onChange={onChangeHandler}
              className="h-20 border border-gray-400 rounded-lg"
              type="number"
            />
            {/* <input type="checkbox" id="cbox1" value="first_checkbox" /> */}
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
