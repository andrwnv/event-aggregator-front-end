import axios, { AxiosPromise } from 'axios'

import { templateURL_V1 } from './const'
import { CreateUserDto, UpdateUserDto } from '../types/user.type'
import { authHeader } from './auth/auth.header'

export const CreateUser = (dto: CreateUserDto): AxiosPromise => {
    return axios({
        method: 'POST',
        url: `${templateURL_V1}/user/create`,
        data: {
            first_name: dto.firstName,
            second_name: dto.secondName,
            email: dto.email,
            password: dto.password,
        },
    })
}

export const UpdateUser = async (dto: UpdateUserDto): Promise<boolean> => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `${templateURL_V1}/user/update`,
            headers: authHeader(),
            data: {
                first_name: dto.firstName,
                second_name: dto.secondName,
                birth_day: Math.floor(dto.birthDay.getTime() / 1000)
            }
        })

        return res.status === 202
    } catch (err) {
        return false
    }
}

export const DeleteUser = async (): Promise<boolean> => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `${templateURL_V1}/user/delete`,
            headers: authHeader(),
        })

        return res.status === 200
    } catch (err) {
        return false
    }
}
