import React, { CSSProperties, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'

import { MeMarker, PlaceMarker, EventMarker } from './MapIcons'

import { GeoPoint } from '../../misc/GeoPoint'
import { SearchResult } from '../../api/search.api'
import { ObjectType } from '../../api/const'


type ClickableMapInfo = {
    defaultCoords: GeoPoint;
    handler: (point: GeoPoint) => void;
    selectedCoords?: GeoPoint;
    objects?: SearchResult[];
    style?: CSSProperties;
};

function ClickableMapComponent(props: ClickableMapInfo) {
    const [initialPosition] = useState<GeoPoint>(props.defaultCoords)
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>(
        props.selectedCoords === undefined ? [props.defaultCoords.lat, props.defaultCoords.lon]
            : [props.selectedCoords.lat, props.selectedCoords.lon],
    )

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

        return (selectedPosition ?
            <Marker
                icon={MeMarker}
                key={selectedPosition[0]}
                position={selectedPosition}
                interactive={true}
            >

            </Marker> : null)
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
                    return item.type === ObjectType.EVENT
                        ?
                        <Marker
                            key={`${item.location.lon}_${item.location.lat}`}
                            position={[item.location.lat, item.location.lon]}
                            interactive={true}
                            icon={EventMarker}
                        >
                            <Popup>
                                Событие: {item.title}
                                <br />
                                <a style={{ cursor: 'pointer' }} onClick={() => window.open(`/${item.type}/${item.id}`, '_blank')}>
                                    Перейти к объекту
                                </a>
                            </Popup>
                        </Marker>
                        :
                        <Marker
                            key={`${item.location.lon}_${item.location.lat}`}
                            position={[item.location.lat, item.location.lon]}
                            interactive={true}
                            icon={PlaceMarker}
                        >
                            <Popup>
                                Место: {item.title}
                                <br />
                                <a style={{ cursor: 'pointer' }} onClick={() => window.open(`/${item.type}/${item.id}`, '_blank')}>
                                    Перейти к объекту
                                </a>
                            </Popup>
                        </Marker>
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
