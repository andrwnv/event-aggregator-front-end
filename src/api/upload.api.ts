import axios from 'axios'
import { ObjectType, templateURL_V1 } from './const'
import { authHeader } from './auth/auth.header'

export const UploadObjectImg = (form: FormData, id: string, type: ObjectType) => {
    return axios({
        method: 'PATCH',
        url: `${templateURL_V1}/${type}/add_photos/${id}`,
        data: form,
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const UploadHistoryImg = (form: FormData, id: string) => {
    return axios({
        method: 'PATCH',
        url: `${templateURL_V1}/user_story/add_photos/${id}`,
        data: form,
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const UploadUserAvatar = (form: FormData) => {
    return axios({
        method: 'PATCH',
        url: `${templateURL_V1}/file/update_avatar`,
        data: form,
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data',
        },
    })
}
