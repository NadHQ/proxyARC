import style from './Legend.module.css'
import Navbar from "./Navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layers from "./Layers/Layers";
import Drawing from "./Drawing/Drawing";
import React from "react";

const Legend = ({view}) => {

    return (
        <BrowserRouter>
            <div className={style.legend}>
                <Navbar/>
                <hr/>
                <Routes>
                    <Route path="/layers" element={<Layers view={view}/>}/>
                    <Route path="/drawing/*" element={<Drawing view={view}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}
export default Legend