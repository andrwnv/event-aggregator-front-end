import axios from 'axios'
import { templateURL_V1 } from './const'
import { authHeader } from './auth/auth.header'

export type LinkedEvent = {
    uuid: string
}

export type LinkedPlace = {
    uuid: string
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
