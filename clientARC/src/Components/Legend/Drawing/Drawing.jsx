import style from "./Drawing.module.css"
import React, {useEffect, useState} from "react";
import Tools from "./Tools/Tools";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import SimpleMarker from "./Attributes/SimpleMarker"
import SimpleFill from "./Attributes/SimpleFill";
import SimpleLine from "./Attributes/SimpleLine";
import Text from "./Attributes/Text";

import {ActiveContext} from "./ActiveContext";

const Drawing = ({view}) => {

    const navigate = useNavigate();
    const location = useLocation();

    let [attributes, setAtr] = useState({
        color: [120, 190, 245, 0.7],
        pointType: "circle",
        lineType: "solid",
        fillType: "solid",
        width: "5",
        text: "text",
        textSize: "12",
    })
    const handleChange = (attributes) => {
        setAtr(attributes);
    }

    let [sketch, setSketch] = useState(null);
    let [graphicsLayer, setGraphicsLayer] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [img, setImg] = useState("/images/show.png");

    useEffect(() => {
        if (view && view.map && !graphicsLayer) {
            setGraphicsLayer(view.map.layers.find(layer => layer.title === "Графика"));
        }
        if (graphicsLayer) {
            setSketch(new SketchViewModel({
                view: view,
                layer: graphicsLayer,

                tooltipOptions: {
                    enabled: true,
                },
            }));
        }
    }, [view, graphicsLayer]);

    useEffect(() => {
        if (sketch) {
            // Скрыть свойства в конце рисования
            sketch.on("create", function (evt) {
                if (evt.state === "complete" || evt.state === "cancel") {
                    navigate("");
                    setActiveButton(null);
                }
            })

            // Изменение свойств в зависимости от выбранного объекта на слое с графикой
            sketch.on("update", function (event) {
                if (event.state === "start") {
                    let updatingGraphic = sketch.updateGraphics.at(0).symbol;
                    switch (updatingGraphic.type) {
                        case "simple-marker":
                            setAtr(attributes => ({
                                ...attributes,
                                ...{
                                    pointType: updatingGraphic.style,
                                    color: [updatingGraphic.color.r, updatingGraphic.color.g, updatingGraphic.color.b, updatingGraphic.color.a],
                                    width: updatingGraphic.size,
                                }
                            }))
                            navigate("point");
                            break;
                        case "text":
                            setAtr(attributes => ({
                                ...attributes,
                                ...{
                                    text: updatingGraphic.text,
                                    color: [updatingGraphic.color.r, updatingGraphic.color.g, updatingGraphic.color.b, updatingGraphic.color.a],
                                    textSize: updatingGraphic.font.size,
                                }
                            }))
                            navigate("text");
                            break;
                        case "simple-line":
                            setAtr(attributes => ({
                                ...attributes,
                                ...{
                                    width: updatingGraphic.width,
                                    color: [updatingGraphic.color.r, updatingGraphic.color.g, updatingGraphic.color.b, updatingGraphic.color.a],
                                    lineType: updatingGraphic.style,
                                }
                            }))
                            navigate("line");
                            break;
                        case "simple-fill":
                            setAtr(attributes => ({
                                ...attributes,
                                ...{
                                    width: updatingGraphic.outline.width,
                                    color: [updatingGraphic.color.r, updatingGraphic.color.g, updatingGraphic.color.b, updatingGraphic.color.a],
                                    fillType: updatingGraphic.style,
                                    lineType: updatingGraphic.outline.style,
                                }
                            }))
                            navigate("fill");
                            break;
                    }
                }
                if (event.state === "complete") {
                    navigate("");
                }
            })
        }
    }, [sketch])

    useEffect(() => {
// Обновление символов Sketch при обновлении свойств
        if (sketch && attributes) {
            sketch.polylineSymbol = {
                type: "simple-line",
                color: attributes.color,
                width: attributes.width,
                style: attributes.lineType,
                join: "miter",
                cap: "square"
            };
            sketch.polygonSymbol = {
                type: "simple-fill",
                style: attributes.fillType,
                color: attributes.color,
                outline: {
                    style: attributes.lineType,
                    width: attributes.width,
                    color: [attributes.color[0], attributes.color[1], attributes.color[2], 1],
                    join: "miter",
                    cap: "square"
                }
            };

            if (location.pathname === "/drawing/text") {
                sketch.pointSymbol = {
                    type: "text",
                    color: attributes.color,
                    text: attributes.text,
                    font: {
                        size: attributes.textSize,
                        family: "Josefin Slab",
                        weight: "bold"
                    }
                }
            }

            if (location.pathname === "/drawing/point") {
                sketch.pointSymbol = {
                    type: "simple-marker",
                    color: attributes.color,
                    size: attributes.width,
                    style: attributes.pointType,
                    outline: null,
                }
            }
        }

        // Обновление выбранного объекта на слое с графикой при обновлении свойств
        let updatingGraphic;
        if (sketch && sketch.updateGraphics.length > 0) {
            updatingGraphic = sketch.updateGraphics.at(0).symbol;
            switch (updatingGraphic.type) {
                case "simple-marker":
                    updatingGraphic = sketch.pointSymbol;
                    break;
                case "text":
                    updatingGraphic = sketch.pointSymbol;
                    break;
                case "simple-line":
                    updatingGraphic = sketch.polylineSymbol;
                    break;
                case "simple-fill":
                    updatingGraphic = sketch.polygonSymbol;
                    break;
            }
            sketch.updateGraphics.at(0).symbol = updatingGraphic;
        }
    }, [attributes, location])

    const showHandler = () => {
        if (graphicsLayer.visible) {
            graphicsLayer.visible = false;
            setImg("/images/hide.png");
        } else {
            graphicsLayer.visible = true;
            setImg("/images/show.png");
        }
    }

    return (
        <div className={style.drawing}>

            <div className={style.graphics}>
                <img src={img} alt="+" onClick={showHandler}/>
                <label>Графика</label>
            </div>

            <div>
                <hr/>
                <ActiveContext.Provider value={{activeButton, setActiveButton}}>
                    <Tools sketch={sketch}/>
                </ActiveContext.Provider>
                <Routes>
                    <Route path="point" element={<SimpleMarker onChange={handleChange} attributes={attributes}/>}/>
                    <Route path="line" element={<SimpleLine onChange={handleChange} attributes={attributes}/>}/>
                    <Route path="fill" element={<SimpleFill onChange={handleChange} attributes={attributes}/>}/>
                    <Route path="text" element={<Text onChange={handleChange} attributes={attributes}/>}/>
                </Routes>
            </div>

        </div>
    )
}

export default Drawing