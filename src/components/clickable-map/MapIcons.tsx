import L from 'leaflet'

import MeIcon from './icons/me_icon.svg'
import PlaceIcon from './icons/place_icon.svg'
import EventIcon from './icons/event_icon.svg'

const MeMarker = new L.Icon({
    iconUrl: MeIcon,
    iconRetinaUrl: MeIcon,
    iconAnchor: undefined,
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: undefined,
    iconSize: new L.Point(25, 35),
    popupAnchor:  [-0, -0],
})

const PlaceMarker = new L.Icon({
    iconUrl: PlaceIcon,
    iconRetinaUrl: PlaceIcon,
    iconAnchor: undefined,
    popupAnchor: [0, 0],
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: undefined,
    iconSize: new L.Point(25, 35),
})

const EventMarker = new L.Icon({
    iconUrl: EventIcon,
    iconRetinaUrl: EventIcon,
    iconAnchor: undefined,
    popupAnchor: [0, 0],
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: undefined,
    iconSize: new L.Point(25, 35),
})

export {MeMarker, PlaceMarker, EventMarker}
