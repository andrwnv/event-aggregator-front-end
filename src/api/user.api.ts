import axios, { Axios, AxiosPromise } from 'axios';

const templateURL_V1 = 'http://localhost:9090/api/v1'

type CreateUserDto = {
    firstName: string;
    secondName: string;
    email: string;
    password: string;
}

export const CreateUser = (info: CreateUserDto): AxiosPromise => {
    return axios({
        method: 'POST',
        url: `${templateURL_V1}/user/create`,
        data: {
            first_name: info.firstName,
            second_name: info.secondName,
            email: info.email,
            password: info.password
        }
    })
}

export const GetUserInfo = (): AxiosPromise => {
    return axios({
        method: 'GET',
        url: `${templateURL_V1}/user/create`,
        data: {
        }
    })
}

