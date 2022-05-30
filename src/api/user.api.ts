import axios, { AxiosPromise } from 'axios'

import { templateURL_V1 } from './const'
import { CreateUserDto } from '../types/user.type'

export const CreateUser = (info: CreateUserDto): AxiosPromise => {
  return axios({
    method: 'POST',
    url: `${templateURL_V1}/user/create`,
    data: {
      first_name: info.firstName,
      second_name: info.secondName,
      email: info.email,
      password: info.password,
    },
  })
}

export const GetUserInfo = (): AxiosPromise => {
  return axios({
    method: 'GET',
    url: `${templateURL_V1}/user/create`,
    data: {},
  })
}
