import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import './newMap.css';

const libraries = ["places"];
const mapContainerStyle = {
    height: "50vh",
    marginTop: "30px"
};
const options = {

};

const center = {
    lat: 43.4723,
    lng: -80.5449
};

export default function NewMap(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAlK64Br8dLihUOej4ReReLt2dUTJSrgcQ",
        libraries,
    });
    const [mapCenter, setMapCenter] = React.useState(center);
    const [selected, setSelected] = React.useState(null);



    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng,address }) => {
        setMapCenter({lat,lng})
        props.setAddress(address)
        props.setLocation({lat,lng})
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(15);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div>

            <Search panTo={panTo} />

            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >

                    <Marker
                        position={{ lat: mapCenter.lat, lng: mapCenter.lng }}Z



                    />


                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h2>
                <span role="img" aria-label="bear">

                </span>{" "}
                                Alert
                            </h2>

                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
}



function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 },
            radius: 100 * 1000,
        },
    });


    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng, address });
        } catch (error) {
        }
    };

    return (
        <div className="mapSearch" style={{fontSize:'14px', width:'100%'}}>
            <Combobox onSelect={handleSelect}
                      >
                <ComboboxInput

                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Enter the Address"
                />
                <ComboboxPopover portal={false}>
                    <ComboboxList style={{
    textAlign:'left'
                    }} >
                        {status === "OK" &&
                        data.map(({ id, description }) => (
                            <ComboboxOption key={id} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}