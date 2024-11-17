import style from "./Properties.module.css";
import React from "react";
import CustomSelect from "./CustomSelect";
import {lineType} from "./styles";

const LineType = ({onChange, attributes}) => {
    const lineChange = (value) => {
        let updatedValue = {lineType: value};
        onChange(updatedValue);
    }

    let type = lineType.map(e => e.value).indexOf(attributes.lineType);

    return (
        <div className={style.property}>
            <label>Тип линии: </label>
            <CustomSelect onChange={lineChange} options={lineType} def={type}/>
        </div>
    )
}
export default LineType

