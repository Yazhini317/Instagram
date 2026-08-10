import React from 'react'
import SideBar from './components/SideBar'
import Feed from './components/Feed'
import Suggestions from './components/Suggestions'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <>
   <div className='d-flex vh-100'>
   <div  className="w-20">
    <SideBar />
    </div> 
   <div className='w-30 feed'>
   <Feed />
   </div>
    <div  className='w-50 suggestions '>

    <Suggestions/>
    </div>

    </div>
    
    </>
  
  )
}

export default App