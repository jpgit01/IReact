import { useState } from 'react'
import './App.css'
import MiApi from './components/MiApi'
import Buscador from './components/Buscador'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MiApi/>
    <Buscador/>
    </>
  )
}

export default App
