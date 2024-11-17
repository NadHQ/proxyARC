import style from "./Properties.module.css";

const Color = ({onChange, attributes}) => {

    const colorChange = (event) => {
        let updatedValue = {color: [hexToRGB(event.target.value).r, hexToRGB(event.target.value).g, hexToRGB(event.target.value).b, attributes.color[3]]};
        onChange(updatedValue);
    }

    function hexToDec(hex) {
        return parseInt(hex, 16);
    }

    function hexToRGB(hexColor) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
        return {
            r: hexToDec(result[1]),
            g: hexToDec(result[2]),
            b: hexToDec(result[3]),
        };
    }

    function valueToHex(c) {
        let hex=c.toString(16);
        while(hex.length<2){
            hex="0"+hex;
        }
        return hex;
    }

    return (
        <div className={style.property}>
            <label>Цвет: </label>
            <input className={style.color} type='color' onChange={colorChange}
                   defaultValue={"#" + valueToHex(attributes.color[0]) + valueToHex(attributes.color[1]) + valueToHex(attributes.color[2])}/>
        </div>
    )
}

export default Color