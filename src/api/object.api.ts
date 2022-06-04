import axios, { AxiosPromise } from 'axios';
import { ObjectTypes, templateURL_V1 } from './const';
import { authHeader } from './auth/auth.header';
import { User } from '../types/user.type';

export type CreatePlaceDTO = {
    title: string,
    description: string,
    payment_need: boolean,
    longitude: number,
    latitude: number,
    region_id: string
};

export type CreateEventDTO = {
    title: string,
    description: string,
    payment_need: boolean,
    begin_date: number,
    end_date: number,
    longitude: number,
    latitude: number,
    region_id: string
};

export type ObjectRegion = {
    region_id: string,
    region_name: string
}

export type PhotoURL = string;

export type ObjectData = {
    id: string,
    title: string,
    description: string,
    payment_need: boolean,
    begin_date?: number,
    end_date?: number,
    longitude: number,
    latitude: number,
    region_info: ObjectRegion,
    created_by: User,
    photos?: PhotoURL[]
}

export const CreateObject = (info: CreateEventDTO | CreatePlaceDTO, type: ObjectTypes): AxiosPromise => {
    return axios({
        method: 'POST',
        url: `${templateURL_V1}/${type}/create`,
        data: info,
        headers: authHeader()
    });
}

export const GetObjects = async (page: number, count: number, type: ObjectTypes): Promise<ObjectData[]> => {
    try {
        const data = await axios({
            method: 'GET',
            url: `${templateURL_V1}/${type}/consume/${page}/${count}`
        });

        return [
            ...data.data.result
        ]
    } catch (err) {
        return [];
    }
}
