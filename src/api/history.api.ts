import axios from 'axios'
import { templateURL_V1 } from './const'
import { authHeader } from './auth/auth.header'
import { User } from '../types/user.type'

export type LinkedEvent = {
    uuid: string
}

export type LinkedPlace = {
    uuid: string
}

export type ShortHistoryInfo = {
    id: string
    title: string
    text: string
}

export type HistoryList = {
    totalSize: number
    page: number
    size: number
    list: ShortHistoryInfo[]
}

export type History = {
    id: string
    title: string
    text: string
    createdBy: User
    photos: string[],
    createdAt: Date
}

export type CreateHistoryDto = {
    title: string,
    longReadText: string,
    linkedPlaces: LinkedPlace[],
    linkedEvents: LinkedEvent[]
}

export const CreateHistory = async (dto: CreateHistoryDto): Promise<null | string> => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${templateURL_V1}/user_story/create`,
            data: {
                content: {
                    title: dto.title,
                    long_read_text: dto.longReadText,
                },
                places: dto.linkedPlaces,
                events: dto.linkedEvents,
            },
            headers: authHeader(),
        })

        if (res.status === 201)
            return res.data.result.id
        return null
    } catch (err) {
        return null
    }
}

export const GetHistory = async (id: string): Promise<History | null> => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${templateURL_V1}/user_story/${id}`,
        })

        const data = res.data.result

        return {
            id: data.id,
            title: data.title,
            text: data.long_read_text,
            photos: data.linked_photos,
            createdBy: {
                id: data.created_by.id,
                firstName: data.created_by.first_name,
                secondName: data.created_by.second_name,
                email: data.created_by.email,
                verified: data.created_by.verified,
                photoURL: data.created_by?.photo_url,
                birthDay: data.created_by.birth_day === undefined
                    ? undefined
                    : new Date(data.created_by.birth_day * 1000),
            },
            createdAt: new Date(data.created_at * 1000)
        }
    } catch (_) {
        return null
    }
}

export const GetHistoryList = async (page: number, count: number): Promise<HistoryList> => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${templateURL_V1}/user_story/paginate/${page}/${count}`,
        })

        const data = res.data.result

        return {
            totalSize: data.total_size,
            page: data.page,
            size: data.size,
            list: data.list.map((item: any) => ({
                id: item.id,
                title: item.title,
                text: item.long_read_text
            }))
        }
    } catch (_) {
        return {
            totalSize: -1,
            page: -1,
            size: -1,
            list: []
        }
    }
}
