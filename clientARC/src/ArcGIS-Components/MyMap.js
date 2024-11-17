import React, {useEffect, useRef, useState} from 'react';
import MapView from "@arcgis/core/views/MapView.js";
import TileLayer from "@arcgis/core/layers/TileLayer.js";
import Basemap from "@arcgis/core/Basemap";
import WebMap from "@arcgis/core/WebMap";
import style from "./MyMap.module.css"
import MapWidgets from "./MapWidgets";
import MapLayers from "./MapLayers";

const MyMap = ({onChange}) => {

    const mapRef = useRef(null);
    let [view, setView] = useState(null);
    let [map, setMap] = useState(null);

    useEffect(() => {
        if (!mapRef?.current) return;

        const imageTileLayer = new TileLayer({
            url: "http://localhost:8000/arcservertest/rest/services/C01_Belarus_WGS84/Belarus_BaseMap_WGS84/MapServer"
        });

        const basemap = new Basemap({
            baseLayers: [
                imageTileLayer,
            ]
        });

        const map = new WebMap({
            basemap: basemap
        });
        setMap(map);

        view = new MapView({
            map: map,
            center: [27.6, 53.9],
            zoom: 13,
            container: mapRef.current
        });
        setView(view);
        onChange(view);
    }, [])

    return (
        <div className={style.viewDiv} ref={mapRef}>
            {view && <MapWidgets view={view}/>}
            {view && <MapLayers map={map}/>}
        </div>
    )
}

export default MyMap;