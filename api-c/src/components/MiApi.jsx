import { useEffect, useState } from "react"


function MiApi() {
const [count, setCount] = useState(0)
const [dia, setDia] = useState({})

const getDay = async () => {
  const resp = await fetch('https://api.victorsanmartin.com/feriados/en.json')
  const data = await resp.json()
  setDia(data)
}

useEffect(() => {
  getDay()
},[])
  return (
    <>
      <div>
        <p>Estado es: {count}</p>
        <button onClick={ () => setCount(count + 1)}>+1</button>
      </div>
    </>
  )
}

export default MiApi
