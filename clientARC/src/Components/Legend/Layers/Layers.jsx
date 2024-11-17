import style from "./Layers.module.css"
import {useEffect, useState} from "react";

const Layers = ({view}) => {
    const [img, setImg] = useState([]);
    const [layers, setLayers] = useState([]);

    useEffect(() => {
        if (view && view.map && layers.length === 0) {
            let myLayers = [];
            let newImg = [];

            view.map.layers.forEach((layer) => {
                if (layer.type !== "graphics") {
                    myLayers.push(layer);
                    // Устанавливаем изображение в зависимости от видимости слоя
                    if (layer.visible) {
                        newImg.push("/images/show.png");
                    } else {
                        newImg.push("/images/hide.png"); // или другое изображение по умолчанию
                    }
                }
            });

            setLayers(myLayers);
            setImg(newImg); // Устанавливаем новый массив изображений
        }
    }, [view, layers]);

    const showHandler = (layer, index) => {
        if (layer.visible) {
            layer.visible = false;
            const array = img.map((img, i) => {
                if (i === index) {
                    return "/images/hide.png";
                } else {
                    return img;
                }
            })
            setImg(array);
        } else {
            layer.visible = true;
            const array = img.map((img, i) => {
                if (i === index) {
                    return "/images/show.png";
                } else {
                    return img;
                }
            })
            setImg(array);
        }
    }

    return (
        <div className={style.layers}>{
            layers.map((item, index) =>
                <div className={style.layer} key={index}>
                    <img src={img[index]} alt="+" onClick={() => showHandler(item, index)}/>
                    <label>{item.title}</label>
                </div>
            )}
        </div>
    )
}

export default Layers