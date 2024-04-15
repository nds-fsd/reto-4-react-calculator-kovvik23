import React, { useState, useEffect } from 'react'
import Calculator from './components/Calculator'
import DarkModeToggle from './components/DarkModeToggle'
import './components/Calculator/styles.css'
import './components/DarkModeToggle/styles.css'

const  App = () => {
  const[darkMode, setDarkMode] = useState(false)

  // Toggling the class on the body element when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]); 

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <>
      <DarkModeToggle onToggle={toggleDarkMode}/>
      <Calculator />
    </>
  );
}

export default App;
