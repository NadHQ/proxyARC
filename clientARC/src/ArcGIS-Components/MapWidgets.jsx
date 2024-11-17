import {useEffect} from 'react';
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";
import Home from "@arcgis/core/widgets/Home.js";

const MapWidgets = ({view}) => {

    let home = new Home({view: view});
    let scaleBar = new ScaleBar({view: view});

    useEffect(() => {
        view.ui.add(home, "top-left");
        view.ui.add(scaleBar, "bottom-left");
    }, [])

    return null;
}

export default MapWidgets