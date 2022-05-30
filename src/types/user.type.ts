import uuid from 'uuid'

export type User = {
  id: typeof uuid.v4
  firstName: string
  secondName: string
  email: string
  verified: boolean
  photoURL: string
}

export type LogInDto = {
  email: string
  password: string
}

export type LoginResult = {
  token: string
}

export type CreateUserDto = {
  firstName: string
  secondName: string
  email: string
  password: string
}
