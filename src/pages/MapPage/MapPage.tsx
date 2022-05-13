import React, { Component, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';

function ClickableMapComponent() {
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);

        });
    }, []);


    const Markers = () => {
        useMapEvents({
            click(e) {
                alert(`lon:${e.latlng.lng} lat:${e.latlng.lat}`)
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
            },
        })

        return (selectedPosition ? <div /> : null )
    }

    return(
        <MapContainer
            center={selectedPosition || initialPosition}
            zoom={12}
        >
            <Markers />
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default ClickableMapComponent;
