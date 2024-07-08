import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AttendanceReport from './component/AttendanceReport.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='bg-red-50'> attandence 
      <AttendanceReport />
      </div>
    </>
  )
}

export default App
