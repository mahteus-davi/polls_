import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Relatorio from "./Components/Relatorio/Relatorio";
import Home from "./pages/Home/Home";


function RouterApp (){

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/relatorio" element={ <Relatorio /> } />
    
            <Route path="*" element={ <Home/>} />
        </Routes>
    </BrowserRouter>

    );
    

    
}

export default RouterApp;