import React, {useEffect, useRef, useState} from 'react'
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
let Scroll   = require('react-scroll');
let Element  = Scroll.Element;
let scroller = Scroll.scroller;

const containerStyleMain = {
    width: window.innerHeight < window.innerWidth ? '80%' : '90%',
    height: window.innerHeight < window.innerWidth ? (window.innerHeight * 0.5) + 'px' : (window.innerHeight * 0.25) + 'px',
    borderRadius: '25px',
};

const containerStylePost = {
    width: '100%',
    height: '200px',

};

const center = {
    lat: 43.4723,
    lng: -80.5449
};

const mapDivStyleMain = {
    paddingTop: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
}

const mapDivStylePost = {
    width: '100%'
}

function MapComponent(props) {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const handleCenterChanged = () =>{
        if (!mapRef.current) return;
        const newPos = mapRef.current.getCenter().toJSON();
        props.setCenterMarker(newPos);
    }
    function handleLoad(Map) {
        setMap(Map)
        mapRef.current = Map;
    }

    useEffect(() => {
        if (map && props.mainMap && props.markers.length >0) {
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(center)
            props.markers.map(marker => {
                bounds.extend(marker.position);
            });
            map.fitBounds(bounds);
        }
    }, [map, props.markers]);

    function scrollToMarker(id) {

    }

    if (props.firstMap) {
        return (
            <LoadScript
            googleMapsApiKey="AIzaSyAlK64Br8dLihUOej4ReReLt2dUTJSrgcQ"
        >
            <div style={props.mainMap ? mapDivStyleMain : mapDivStylePost}>
                <GoogleMap
                    onLoad={handleLoad}
                    mapContainerStyle={props.mainMap ? containerStyleMain : containerStylePost}
                    onCenterChanged={props.hasCenterMarker? handleCenterChanged: ()=>{}}
                    center={props.center || center}
                    zoom={15}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <></>
                    {props.markers ? props.markers.map(marker =>  <Marker onClick={props.mainMap? ()=>{

                        scroller.scrollTo(marker.id, {duration: 1500,
                                delay: 100,
                                smooth: true,})

                        }:
                    ()=>{}} key={marker.id} position={marker.position}></Marker>) : <></>}
                </GoogleMap>

            </div>
        </LoadScript>)
    }
    return  <div style={mapDivStylePost}>
        <GoogleMap

            mapContainerStyle={containerStylePost}
            center={props.center || center}
            zoom={15}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
            {props.markers ? props.markers.map(marker => <Marker key={marker.id} position={marker.position}></Marker>) : <></>}
        </GoogleMap>

    </div>

}



export default MapComponent