import axios from 'axios';

import { templateURL_V1 } from '../const';
import { LogInDto, LoginResult, User } from '../../types/user.type';
import { authHeader } from './auth.header';

export const Login = async (info: LogInDto): Promise<LoginResult> => {
    const response = await axios({
        method: 'POST',
        url: `${templateURL_V1}/auth/login`,
        data: {
            email: info.email,
            password: info.password
        },
    });
    return {token: response.data.token};
}

export const Me = async (): Promise<User> => {
    const response = await axios({
        method: 'GET',
        url: `${templateURL_V1}/user/me`,
        headers: authHeader()
    });

    return response.data.result;
}
