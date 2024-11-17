import style from './Navbar.module.css'
import React from "react";
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={style.navigate}>
            <div className={style.item}>
                <NavLink to="/layers">Слои</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to="/drawing">Рисование</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;