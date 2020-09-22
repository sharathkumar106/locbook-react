import React, { useEffect } from 'react';
import './Map.css';

const API_KEY = 'jtBQVl778ihiecS8lTCKjZMb9nndjn1L';


const createMarker = (tt, map, icon, position, color, popupText) => {
    let markerElement = document.createElement('div');
    markerElement.className = 'marker';
    let markerContentElement = document.createElement('div');
    markerContentElement.className = 'marker-content';
    markerContentElement.style.backgroundColor = color;
    markerElement.appendChild(markerContentElement);
    let iconElement = document.createElement('div');
    iconElement.className = 'marker-icon';
    iconElement.style.backgroundImage =
        'url('+icon+')';
    markerContentElement.appendChild(iconElement);
    let popup = new tt.Popup({ offset: 30 }).setHTML('<h4>' + popupText + '</h4>');
    // add marker to map
    new tt.Marker({ element: markerElement, anchor: 'bottom' })
        .setLngLat(position)
        .setPopup(popup)
        .addTo(map);
    console.log(icon);
}

const Map = props => {
    const { center, title, icon } = props;

    useEffect(() => {
        const tt = window.tt;

        const map = tt.map({
            key: API_KEY,
            container: 'map',
            style: 'tomtom://raster/1/basic-main',
            center: center,
            zoom: 15
        });

        map.addControl(new tt.FullscreenControl());
        map.addControl(new tt.NavigationControl());

        createMarker(tt, map, icon , [center.lng, center.lat], '#292929', title);

    }, [center, title, icon]);

    return <div id="map" className={`map ${props.className}`}></div>
};

export default Map;


/*

// ------------------------USING MAPBOX------------------------


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
            center: center, // starting position [lng, lat]
            zoom: 18 // starting zoom
        });
        map.addControl(new mapboxgl.NavigationControl());

        new mapboxgl.Marker({position: center, map: map});
    },[container, center]);

    return <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>
};

export default Map;

*/