import style from "./Properties.module.css";
import React from "react";
import CustomSelect from "./CustomSelect";
import {dotType} from "./styles";

const DotType = ({onChange, attributes}) => {

    const pointChange = (value) => {
        let updatedValue = {pointType: value};
        onChange(updatedValue);
    }

    let type = dotType.map(e => e.value).indexOf(attributes.pointType);

    return (
        <div className={style.property}>
            <label>Тип точки: </label>
            <CustomSelect onChange={pointChange} options={dotType} def={type}/>
        </div>
    )
}
export default DotType

