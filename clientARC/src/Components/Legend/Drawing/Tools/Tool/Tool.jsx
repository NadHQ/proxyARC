import style from "./Tool.module.css"
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useContext, useRef} from "react";

import {ActiveContext} from "../../ActiveContext";

const Tool = ({title, sketch, img, tool, mode}) => {

    const navigate = useNavigate();
    const location=useLocation();
    const toolRef = useRef(null);
    const {activeButton, setActiveButton} =  useContext(ActiveContext);
    /*useEffect(()=>{
        if (!toolRef?.current) return;
        if(location.pathname.indexOf("/drawing") !== -1 && toolRef.current.className===style.active){
            toolRef.current.className=style.nonactive;
        }
    },[location])*/
    if (toolRef.current) {
        if (activeButton === toolRef.current) {
            toolRef.current.className = style.active;
        } else {
            toolRef.current.className=style.nonactive;
        }
    }
    const handleDrawing = (event) => {
        let button = event.currentTarget;
        setActiveButton(button);
        if (tool !== "cancel") {


            if (tool !== "text") {
                sketch.create(tool, {mode: mode});
            } else {
                sketch.create("point", {mode: mode});
            }

            switch (tool) {
                case "point":
                    navigate("point");
                    break;
                case "text":
                    navigate("text");
                    break;
                case "circle":
                case "rectangle":
                case "polygon":
                    navigate("fill");
                    break;
                case "polyline":
                    navigate("line");
                    break;
            }
        } else {
            sketch.cancel();
            setActiveButton(null);
        }
    }

    return (
        <button ref={toolRef} title={title} className={style.nonactive} onClick={handleDrawing}>
            <img className={style.image} src={img} alt={tool}/>
        </button>
    )
}
export default Tool