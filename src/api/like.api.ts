import axios from 'axios'

import { ObjectTypes, templateURL_V1 } from './const'
import { authHeader } from './auth/auth.header'

type LikeDto = {
    event_id?: string;
    place_id?: string;
};

export const LikeObject = async (id: string, type: ObjectTypes): Promise<boolean> => {
    let dto = {} as LikeDto
    if (type === ObjectTypes.EVENT) {
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
