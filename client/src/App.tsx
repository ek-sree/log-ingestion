import './App.css'
import { Route, Routes } from 'react-router-dom'
import LogRouter from './routes/LogRouter'

function App() {

  return (
    <>
     <Routes>
      <Route path="/*" element={<LogRouter/>} />
     </Routes>
    </>
  )
}

export default App
