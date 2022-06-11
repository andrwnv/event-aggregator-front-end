import axios from 'axios'

import { ObjectType, templateURL_V1 } from './const'
import { authHeader } from './auth/auth.header'

type LikeDto = {
    event_id?: string;
    place_id?: string;
};

export const LikeObject = async (id: string, type: ObjectType): Promise<boolean> => {
    let dto = {} as LikeDto
    if (type === ObjectType.EVENT) {
        dto.event_id = id
    } else {
        dto.place_id = id
    }

    const result = await axios({
        method: 'POST',
        url: `${templateURL_V1}/likes/like`,
        data: dto,
        headers: authHeader(),
    })

    return result.status === 201
}

export const DislikeObject = async (id: string): Promise<boolean> => {
    const result = await axios({
        method: 'DELETE',
        url: `${templateURL_V1}/likes/dislike/${id}`,
        headers: authHeader(),
    })

    return result.status === 200
}

export const IsLiked = async (id: string): Promise<boolean> => {
    const result = await axios({
        method: 'GET',
        url: `${templateURL_V1}/likes/is_liked/${id}`,
        headers: authHeader()
    })

    return result.data.result
}
