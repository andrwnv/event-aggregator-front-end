import React, { CSSProperties, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

import { GeoPoint } from '../../misc/GeoPoint'
import { SearchResult } from '../../api/search.api'

type ClickableMapInfo = {
    defaultCoord: GeoPoint;
    handler: (point: GeoPoint) => void;

    selectedCoords?: GeoPoint;

    objects?: SearchResult[];

    style?: CSSProperties;
};

function ClickableMapComponent(props: ClickableMapInfo) {
    const [initialPosition, ] = useState<GeoPoint>(props.defaultCoord)
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>(
        props.selectedCoords === undefined ? [props.defaultCoord.lat, props.defaultCoord.lon]
            : [props.selectedCoords.lat, props.selectedCoords.lon],
    )

    const Markers = () => {
        useMapEvents({
            click(e) {
                const coords = e.latlng
                props.handler({ lat: coords.lat, lon: coords.lng })
                console.log(coords)
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
                props.objects?.map(item => {
                    return (<Marker
                        key={`${item.location.lon}_${item.location.lat}`}
                        position={[item.location.lat, item.location.lon]}
                        interactive={false}
                    />)
                })
            }

            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
        </MapContainer>
    )
}

export default ClickableMapComponent
