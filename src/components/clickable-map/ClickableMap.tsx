import React, { CSSProperties, useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import { GeoPoint } from '../../misc/GeoPoint';

type ClickableMapInfo = {
    defaultCoord: GeoPoint;
    handler: (point: GeoPoint) => void;

    eventsPositions?: GeoPoint[];
    placesPositions?: GeoPoint[];

    style?: CSSProperties;
};

function ClickableMapComponent(props: ClickableMapInfo) {
    const [initialPosition, setInitialPosition] = useState<[number, number]>([props.defaultCoord.lat, props.defaultCoord.lon]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([props.defaultCoord.lat, props.defaultCoord.lon]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    }, []);

    const Markers = () => {
        useMapEvents({
            click(e) {
                const coords = e.latlng;
                props.handler({lat: coords.lat, lon: coords.lng})
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
            },
        })

        return (selectedPosition ? <Marker
            key={selectedPosition[0]}
            position={selectedPosition}
            interactive={false}
        /> : null )
    }

    return(
        <MapContainer
            center={selectedPosition || initialPosition}
            zoom={12}
            style={props?.style}
        >
            <Markers />

            {
                props.eventsPositions?.map(item => (
                    <Marker
                        key={1}
                        position={[item.lat, item.lon]}
                        interactive={false}
                    />
                ))
            }

            {
                props.placesPositions?.map(item => (
                    <Marker
                        key={1}
                        position={[item.lat, item.lon]}
                        interactive={false}
                    />
                ))
            }

            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default ClickableMapComponent;
