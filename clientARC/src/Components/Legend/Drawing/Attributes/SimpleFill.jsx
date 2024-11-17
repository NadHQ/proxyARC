import React from "react";
import Color from "./Properties/Color";
import Width from "./Properties/Width";
import Opacity from "./Properties/Opacity";
import LineType from "./Properties/LineType";
import FillType from "./Properties/FillType";

const SimpleFill = ({onChange, attributes}) => {

    const settingAttributes = (updating) => {
        onChange(attributes => ({
            ...attributes,
            ...updating
        }));
    }

    return (
        <div>
            <hr/>
            <Color onChange={settingAttributes} attributes={attributes}/>
            <Width onChange={settingAttributes} attributes={attributes}/>
            <Opacity onChange={settingAttributes} attributes={attributes}/>
            <LineType onChange={settingAttributes} attributes={attributes}/>
            <FillType onChange={settingAttributes} attributes={attributes}/>
        </div>
    )
}

export default SimpleFill