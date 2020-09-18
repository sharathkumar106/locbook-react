import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

const Map = props => {
    const mapRef = useRef();
    const {container, center} = props;

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoid2hpdGVtaWNyb3Bob25lMTAiLCJhIjoiY2tmOGw0ampmMGRjczJ1bzh4aHN4ODdhMCJ9.Qj_lx-sQeh1HbVJSTmpZgQ';
        const map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/navigation-preview-night-v4', // stylesheet location
            center: [0,0], // starting position [lng, lat]
            zoom: 18 // starting zoom
        });
        map.addControl(new mapboxgl.NavigationControl());

        new mapboxgl.Marker({position: center, map: map});
    },[container, center]);
    
    return <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>
};

export default Map;