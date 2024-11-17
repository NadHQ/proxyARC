import React from "react";
import Color from "./Properties/Color";
import Width from "./Properties/Width";
import Opacity from "./Properties/Opacity";
import DotType from "./Properties/DotType";

const SimpleMarker = ({onChange, attributes}) => {

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
            <DotType onChange={settingAttributes} attributes={attributes}/>
        </div>
    )
}

export default SimpleMarker