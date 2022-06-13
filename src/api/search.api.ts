import axios from 'axios'

import { ObjectType, templateURL_V1 } from './const'
import { GeoPoint } from '../misc/GeoPoint'

export type SearchNearbyDto = {
    coords: GeoPoint,
    types: ObjectType[],
    from: number,
    limit: number
}

export type SearchByValueDto = {
    value: string,
    types: ObjectType[],
    from: number,
    limit: number
}

export type SearchResult = {
    id: string,
    title: string,
    location: GeoPoint,
    type: ObjectType
}

const genTypeList = (types: ObjectType[]): string => {
    let res = ''
    if (types.length !== 0) {
        for (const type of types)
            res += `${type},`
    }

    return res
}

export const SearchByValue = async (dto: SearchByValueDto) => {
    const params = new URLSearchParams({
        value: dto.value,
        f: dto.from.toString(10),
        s: dto.limit.toString(10),
        type: genTypeList(dto.types),
    }).toString()

    try {
        const res = await axios({
            method: 'GET',
            url: `${templateURL_V1}/search/value?` + params
        })

        console.log(res)
    } catch (e) {

    }
}

// {
//     "id": "54bf1572-f76e-4b2e-a869-a4bd628adcbc",
//     "location_name": "Тут мой дом",
//     "location": {
//     "lat": 56.6,
//         "lon": 84.85
// },
//     "location_type": "place"
// },

export const SearchNearby = async (dto: SearchNearbyDto): Promise<SearchResult[]> => {
    const params = new URLSearchParams({
        lat: dto.coords.lat.toString(),
        lon: dto.coords.lon.toString(),
        f: dto.from.toString(10),
        s: dto.limit.toString(10),
        type: genTypeList(dto.types),
    }).toString()

    try {
        const res = await axios({
            method: 'GET',
            url: `${templateURL_V1}/search/nearby?` + params
        })

        return res.data.result.map((item: any) => ({
            id: item.id,
            title: item.location_name,
            location: item.location,
            type: item.location_type
        } as SearchResult))
    } catch (e) {
        return []
    }
}

