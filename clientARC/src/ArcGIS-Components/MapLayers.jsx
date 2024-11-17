import {useEffect} from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import TileLayer from "@arcgis/core/layers/TileLayer.js";
import PopupTemplate from "@arcgis/core/PopupTemplate";

const MapLayers = ({map}) => {

    const cover = {
        "title": "Населенные пункты",
        "content": "<b>Наименование АТЕ и ТЕ:</b> {ADMINOTE}<br><b>Район:</b> {Rajon}"
    }

    const layer = new FeatureLayer({
        url: "http://localhost:8000/arcservertest/rest/services/A06_ATE_TE_WGS84/ATE_Minsk_public/MapServer/1",
        title: "Населенные пункты",
        visible: true,
        outFields: ["ADMINOTE", "Rajon"],
        popupTemplate: cover,
    });

    const landPlotCover = {
        "title": "Земельные участки",
        "content": "<b>Зарегистрированная площадь:</b> {SQ}<br><b>Кадастровый №:</b> {CADNUM}<br><b>Площадь:</b> {SHAPE_Area} га"
    }

    const landPlotLayer = new FeatureLayer({
        url: "http://localhost:8000/arcservertest/rest/services/A05_EGRNI_WGS84/Uchastki_Minsk_public/MapServer/0",
        title: "Земельные участки",
        outFields: ["SQ", "CADNUM", "SHAPE_Area"],
        popupTemplate: landPlotCover,
        visible: true,
    });

    const popupLandCover = {
        "title": "Земельное покрытие",
        "content": "<b>Вид земли:</b> {LandType}"
    }

    const landCoverLayer = new FeatureLayer({
        url: "http://localhost:8000/arcservertest/rest/services/A01_ZIS_WGS84/Land_Minsk_public/MapServer/0",
        outFields: ["LandType"],
        popupTemplate: popupLandCover,
        title: "Виды земель",
        visible: true,
    });

    const graphicsLayer = new GraphicsLayer({
            title: "Графика"
        }
    );

    useEffect(() => {

        map.add(layer);
        map.add(landPlotLayer);
        map.add(landCoverLayer);
        map.add(graphicsLayer);
    }, [])

    return null;
}

export default MapLayers