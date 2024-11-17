import style from "./Tools.module.css"
import Tool from "./Tool/Tool";

const Tools = ({sketch}) => {
    return (
        <div className={style.items}>
            <Tool title="Точка" sketch={sketch} img={"/images/dot.png"} tool={"point"} mode={"click"}/>
            <Tool title="Круг" sketch={sketch} img={"/images/circle.png"} tool={"circle"} mode={"hybrid"}/>
            <Tool title="Прямоугольник" sketch={sketch} img={"/images/rectangle.png"} tool={"rectangle"}
                  mode={"hybrid"}/>
            <Tool title="Линия" sketch={sketch} img={"/images/polyline.png"} tool={"polyline"} mode={"click"}/>
            <Tool title="Свободная линия" sketch={sketch} img={"/images/spline.svg"} tool={"polyline"}
                  mode={"freehand"}/>
            <Tool title="Полигон" sketch={sketch} img={"/images/polygon.png"} tool={"polygon"} mode={"click"}/>
            <Tool title="Свободный полигон" sketch={sketch} img={"/images/freepolygon.png"} tool={"polygon"}
                  mode={"freehand"}/>
            <Tool title="Текст" sketch={sketch} img={"/images/text.png"} tool={"text"} mode={"click"}/>
            <Tool title="Отмена" sketch={sketch} img={"/images/cancel.png"} tool={"cancel"}/>
        </div>
    )
}

export default Tools