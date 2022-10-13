import React, { useState, useEffect, useRef } from 'react'

const ref = () => {

  const [name, setname] = useState('')
  const focus = useRef(0)
  function f() {
    focus.current.focus()
  }
  return (
    <div>
      ss{focus.current}
      {/* specifically, ref is the input html element now. */}
      <input ref={focus} value={name} className="w-96 h-16 bg-teal-300 text-white" onChange={e => setname(e.target.value)} />
      <button onClick={()=>f()}>MMM</button>
    </div>
  )
}

export default ref
