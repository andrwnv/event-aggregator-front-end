import axios from 'axios'

import { templateURL_V1 } from '../const'
import { LogInDto, LoginResult, User } from '../../types/user.type'
import { authHeader } from './auth.header'

export const Login = async (info: LogInDto): Promise<LoginResult> => {
    const response = await axios({
        method: 'POST',
        url: `${templateURL_V1}/auth/login`,
        data: {
            email: info.email,
            password: info.password,
        },
    })
    return { token: response.data.result }
}

export const Me = async (): Promise<User> => {
    const response = await axios({
        method: 'GET',
        url: `${templateURL_V1}/user/me`,
        headers: authHeader(),
    })

    const res = response.data.result
    return {
        id: res.id,
        firstName: res.first_name,
        secondName: res.second_name,
        email: res.email,
        verified: res.verified,
        photoURL: res?.photo_url,
        birthDay: res.birth_day === undefined ? undefined : new Date(res.birth_day * 1000)
    }
}
