import style from "./Properties.module.css";
import React from "react";

const Text = ({onChange, attributes}) => {
    const textChange = (event) => {
        if (!event.target.value) {
            event.target.value = "text";
        }

        let updatedValue = {text: event.target.value};
        onChange(updatedValue);
    }

    return (
        <div className={style.property}>
            <label>Текст: </label>
            <input className={style.text} type='text' defaultValue={attributes.text} required onBlur={textChange}/>
        </div>
    )
}
export default Text

