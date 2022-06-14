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

export const SearchByValue = async (dto: SearchByValueDto): Promise<SearchResult[]> => {
    const params = new URLSearchParams({
        val: dto.value,
        f: dto.from.toString(10),
        s: dto.limit.toString(10),
        type: genTypeList(dto.types),
    }).toString()

    console.log('search by value called')

    try {
        const res = await axios({
            method: 'GET',
            url: `${templateURL_V1}/search/value?` + params
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

