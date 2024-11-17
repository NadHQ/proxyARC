import style from "./Properties.module.css";
import React from "react";
import CustomSelect from "./CustomSelect";
import {fillType} from "./styles";

const FillType = ({onChange, attributes}) => {
    const fillChange = (value) => {
        let updatedValue = {fillType: value};
        onChange(updatedValue);
    }

    let type = fillType.map(e => e.value).indexOf(attributes.fillType);

    return (
        <div className={style.property}>
            <label>Тип заливки: </label>
            <CustomSelect onChange={fillChange} options={fillType} def={type}/>
        </div>
    )
}
export default FillType

