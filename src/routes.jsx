import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/header/Header";
import Error from "./pages/Error/Error";
import Favoritos from './pages/Favoritos/Favoritos';
import Filme from "./pages/Filmes/Filmes";
import Home from "./pages/Home/Home";

function RouterApp (){

    return (
    <BrowserRouter>
       <Header />
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/filmes/:id" element={ <Filme /> } />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="*" element={ <Error />} />
        </Routes>
    </BrowserRouter>

    );
    

    
}

export default RouterApp;