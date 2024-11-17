import React, {useState} from 'react';
import "./App.css"
import MyMap from "./ArcGIS-Components/MyMap";
import Header from "./Components/Header/Header";
import Legend from "./Components/Legend/Legend";

const App = () => {
    const [view, setView] = useState(null);

    const handleChange = (view) => {
        setView(view);
    }

    return (
        <div className='app'>
            <Header/>
            <Legend view={view}/>
            <MyMap onChange={handleChange}/>
        </div>
    )
}

export default App