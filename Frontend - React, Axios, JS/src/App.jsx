import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from "react"
import AppRouter from './AppRouter' //Import Router Component
import Footer from './components/Footer'


//Load the router to manage page navigation
function App() {

  // useEffect(()=>{
  //   localStorage.setItem("username","Sita")
  // },[])
  return (
    <div>
      <div>
        <AppRouter/>
      </div>
      <div>
        <Footer/>
      </div>   
    </div>
  );
}

export default App
