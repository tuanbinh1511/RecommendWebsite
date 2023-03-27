import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <h1 className='h-6 p-4 text-3xl font-bold'>Hello world!</h1>
      <div className='p-5 '></div>
      <div className='p-4'></div>
    </div>
  )
}

export default App
