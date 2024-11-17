import React from "react";
import Color from "./Properties/Color";
import TextSize from "./Properties/TextSize";
import Text from "./Properties/Text";

const Dot = ({onChange, attributes}) => {

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
            <Text onChange={settingAttributes} attributes={attributes}/>
            <TextSize onChange={settingAttributes} attributes={attributes}/>
        </div>
    )
}

export default Dot