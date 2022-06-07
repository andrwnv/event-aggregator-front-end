import React, { CSSProperties, useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

import { GeoPoint } from '../../misc/GeoPoint'

type ClickableMapInfo = {
    defaultCoord: GeoPoint;
    handler: (point: GeoPoint) => void;

    selectedCoords?: GeoPoint;

    eventsPositions?: GeoPoint[];
    placesPositions?: GeoPoint[];

    style?: CSSProperties;
};

function ClickableMapComponent(props: ClickableMapInfo) {
    const [initialPosition, setInitialPosition] = useState<GeoPoint>(props.defaultCoord)
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>(
        props.selectedCoords === undefined ? [props.defaultCoord.lat, props.defaultCoord.lon]
            : [props.selectedCoords.lat, props.selectedCoords.lon],
    )

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(position => {
    //         const { latitude, longitude } = position.coords
    //         setInitialPosition({lat: latitude, lon: longitude})
    //     })
    // }, [initialPosition])

    const Markers = () => {
        useMapEvents({
            click(e) {
                const coords = e.latlng
                props.handler({ lat: coords.lat, lon: coords.lng })
                setSelectedPosition([
                    coords.lat,
                    coords.lng,
                ])
            },
        })

        return (selectedPosition ? <Marker
            key={selectedPosition[0]}
            position={selectedPosition}
            interactive={false}
        /> : null)
    }

    return (
        <MapContainer
            key={'clickable-map-container'}
            center={[initialPosition.lat, initialPosition.lon]}
            zoom={12}
            style={props?.style}
        >
            <Markers />

            {
                props.eventsPositions?.map(item => (
                    <Marker
                        key={`${item.lat}_${item.lon}`}
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
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
        </MapContainer>
    )
}

export default ClickableMapComponent
