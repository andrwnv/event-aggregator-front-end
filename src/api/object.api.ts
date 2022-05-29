import axios, { AxiosPromise } from 'axios';
import { templateURL_V1 } from './const';
import { authHeader } from './auth/auth.header';

export type CreatePlaceDTO = {
    title: string,
    description: string,
    payment_required: boolean,
    longitude: number,
    latitude: number,
    region_id: string
};

export type CreateEventDTO = {
    title: string,
    description: string,
    payment_required: boolean,
    begin_date: number,
    end_date: number,
    longitude: number,
    latitude: number,
    region_id: string
};

export enum ObjectTypes {
    EVENT = 'event',
    PLACE = 'place'
}

export const CreateObject = (info: CreateEventDTO | CreatePlaceDTO, type: ObjectTypes): AxiosPromise => {
    return axios({
        method: 'POST',
        url: `${templateURL_V1}/${type}/create`,
        data: info,
        headers: authHeader()
    });
}
