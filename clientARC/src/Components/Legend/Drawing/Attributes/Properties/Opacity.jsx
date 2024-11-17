import React from "react";
import style from "./Properties.module.css";

const Opacity = ({onChange, attributes}) => {
    const opacityChange = (event) => {
        if (!event.target.value) {
            event.target.value = 0.1;
        }
        let updatedValue = {color: [attributes.color[0], attributes.color[1], attributes.color[2], event.target.value]};
        onChange(updatedValue);
    }

    return (
        <div className={style.property}>
            <label>Непрозрачность: </label>
            <input className={style.number} type='number' step="0.1" min='0.1' max='1'
                   defaultValue={attributes.color[3]}
                   onBlur={opacityChange}/>
        </div>
    )
}
export default Opacity
