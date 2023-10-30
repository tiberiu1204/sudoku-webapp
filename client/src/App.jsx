import React, { useState, useEffect } from 'react';
import { Board } from './Components/Board';

const SERVER = "http://localhost:5000" 

function App() {
  const [data, setData] = useState();

  // useEffect(() => {
  //   fetch(SERVER + "/members").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data);
  //       console.log(data);
  //     }
  //   )
  // }, []);

  return (
    <Board />  
  );
}

export default App;