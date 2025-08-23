import { Sun } from "lucide-react";
import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WeatherDetails from "./page/WeatherDetail";
import Dashboard from "./page/Dashboard";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path ='/' element ={<Dashboard/>} />
      <Route path="/weather/:city" element={<WeatherDetails/>}/>
    </Routes>
  )
}
export default App;