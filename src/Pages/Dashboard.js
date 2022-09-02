import React, {useState, useEffect} from 'react'
import Nav from '../Components/Nav'
import DragList from '../Components/DragList'
import RemoveQuote from '../image/RemoveQuote.png'
import ShowQuote from '../image/ShowQuote.png'


import './dashboard.css';

function Dashboard() {
  const [showQuote, setShowQuote] = useState(true)

  return (
    <div className="dashboard">
      <Nav />
      {
        showQuote && 
        <div className="alert">
        <p>"Anything that can go wrong, will go wrong!"</p>
        <button onClick={() => setShowQuote(false)}>
          <img src={RemoveQuote} alt='' />
        </button>
      </div>
      }
      
      <div className='dashboard-body'>
        {
          !showQuote && 
          <button className="showQuote" onClick={() => setShowQuote(true)}>
            <img src={ShowQuote} alt='' />
          </button>
        }
        <DragList />
      </div>
    </div>
  )
}

export default Dashboard