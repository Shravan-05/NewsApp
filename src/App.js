import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import Alert from './Components/Alert';
import Forgetpassword from './Components/Forgetpassword ';
const App = () => {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const api = "f728bd479e984d4ba6022fba15c823d7";
  const [alert, setAlert] = useState(null);
  const changeHandler = (e) => {
    setText(e.target.value);
  };

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      });
      console.log("Alert set:", message, type); // Debugging line
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  return (
    <Router>
        <Navbar onchangeHandler={changeHandler}  text={text} />
        <LoadingBar color='rgb(255, 217, 0)' progress={progress} />
        <Alert alert={alert}/>
        <Routes>
          <Route exact path="/" element={<News asetProgress={setProgress} apikey={api} key="general" pageSize={5} category="general" text={text} />} />
          <Route exact path="/sport" element={<News setProgress={setProgress} apikey={api} key="sport" pageSize={5} category="sport" text={text} />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apikey={api} key="technology" pageSize={5} category="technology" text={text} />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apikey={api} key="business" pageSize={5} category="business" text={text} />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apikey={api} key="health" pageSize={5} category="health" text={text} />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={api} key="entertainment" pageSize={5} category="entertainment" text={text} />} />
           
                      
                       <Route  path="/login" element={<Login showalert={showAlert}/>} />
            <Route  path="/signup" element={<Signup showalert={showAlert}/>} />
            <Route  path="/forgotpassword" element={<Forgetpassword showalert={showAlert}/>} />
        </Routes>
    </Router>
  );
};

export default App;
