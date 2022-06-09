import axios from 'axios'
import { ObjectTypes, templateURL_V1 } from './const'
import { authHeader } from './auth/auth.header'

export const UploadObjectImg = (form: FormData, id: string, type: ObjectTypes) => {
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
