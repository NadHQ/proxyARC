import style from "./Properties.module.css";
import React from "react";

const Width = ({onChange, attributes}) => {
    const widthChange = (event) => {
        if (!event.target.value) {
            event.target.value = 1;
        }

        let updatedValue = {width: event.target.value};
        onChange(updatedValue);
    }

    return (
        <div className={style.property}>
            <label>Ширина: </label>
            <input className={style.number} type='number' step="1" min='1' max='15' defaultValue={attributes.width}
                   onBlur={widthChange}/>
        </div>
    )
}
export default Width

