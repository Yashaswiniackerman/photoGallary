// import Counter from './Counter'
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignUpForm from "./components/SignUpForm.js";
import SignInForm from "./components/SignInForm.js";
import Header from "./components/Header.js";
import Community from "./components/Community.js";
import ImageViewer from "./components/ImageViewer.js";
import Mygallory from "./components/Mygallory.js";





function App() {
  return (
    <div className="App">
        {/* <LoginForm/> */}
        <BrowserRouter >
        <Header />
    <Routes>
      <Route element={<SignUpForm/>} path="/signup"/>
      <Route element={<SignInForm/>} path="/signin"/>
      <Route element={<Community/>} path="/community"/>
      <Route element={<ImageViewer/>} path="/image-viewer/:id"/>
      <Route element={<Mygallory/>} path="/mygallory" />
      
    </Routes>
    </BrowserRouter>
        
    </div>
    

  );
}

export default App;
