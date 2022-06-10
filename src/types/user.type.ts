export type User = {
    id: string;
    firstName: string;
    secondName: string;
    email: string;
    verified: boolean;
    photoURL?: string;
    birthDay?: Date;
}

export type LogInDto = {
    email: string;
    password: string;
}

export type LoginResult = {
    token: string;
}

export type CreateUserDto = {
    firstName: string;
    secondName: string;
    email: string;
    password: string;
}

export type UpdateUserDto = {
    firstName: string;
    secondName: string;
    birthDay: Date;
    password: string;
}
