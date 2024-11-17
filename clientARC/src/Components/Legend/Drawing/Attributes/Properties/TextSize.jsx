import style from "./Properties.module.css";
import React from "react";

const TextSize = ({onChange, attributes}) => {
    const textSizeChange = (event) => {
        if (!event.target.value) {
            event.target.value = 5;
        }

        let updatedValue = {textSize: event.target.value};
        onChange(updatedValue);
    }

    return (
        <div className={style.property}>
            <label>Размер шрифта: </label>
            <input className={style.number} type='number' step="1" min='5' max='50' defaultValue={attributes.textSize}
                   onBlur={textSizeChange}/>
        </div>
    )
}
export default TextSize

