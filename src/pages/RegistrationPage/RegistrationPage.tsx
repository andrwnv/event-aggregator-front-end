import React, { useState } from 'react'

import { Container, Content, FlexboxGrid, Message, toaster } from 'rsuite'
import { useNavigate, Navigate } from 'react-router-dom'

import CustomInput from '../../components/custom-input/CustomInput'

import '../../fonts.css'
import './RegistrationPage.css'

import { CreateUser } from '../../api/user.api'

export default function RegistrationPage() {
  const [firstName, updateFirstName] = useState('')
  const [lastName, updateLastName] = useState('')
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
  const [passwordConfirm, updatePasswordConfirm] = useState('')

  const navigate = useNavigate()

  const jwt = localStorage.getItem('auth-key')
  if (jwt !== null) {
    return <Navigate to='/' replace={true} />
  }

  // Message box creator
  const spawnMessageBox = (message: string) => (
    <Message showIcon type={'error'} closable={true}>
      Ошибка: {message}
    </Message>
  )

  const makeNewUser = async () => {
    if (
      !firstName.length ||
      !lastName.length ||
      !email.length ||
      !password.length ||
      !passwordConfirm.length
    ) {
      toaster.push(spawnMessageBox('Введены не все необходимые данные!'), {
        placement: 'bottomCenter',
      })
      return
    }

    if (password !== passwordConfirm) {
      toaster.push(spawnMessageBox('Пароли не совпадают!'), { placement: 'bottomCenter' })
      return
    }

    const result = await CreateUser({
      email: email,
      firstName: firstName,
      secondName: lastName,
      password: password,
    })
    if (result.status === 409) {
      toaster.push(spawnMessageBox('Пользователь уже существует!'), { placement: 'bottomCenter' })
    } else if (result.status === 500) {
      toaster.push(spawnMessageBox('Пробелмы с сервером, попробуйте позже('), {
        placement: 'bottomCenter',
      })
    }

    if (result.status === 201) {
      navigate('confirmed')
    }
  }

  return (
    <Container>
      <Content className={'root-container-reg'}>
        <FlexboxGrid justify='center' align='middle' className={'reg-form'}>
          <div
            className={'default-bottom-margin'}
            style={{
              fontWeight: 600,
              fontSize: '3vh',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            Присоединяйтесь к нам!
          </div>

          <FlexboxGrid
            justify='center'
            align='middle'
            style={{
              paddingTop: '2vh',
            }}
          >
            <div
              style={{
                fontWeight: 500,
                fontSize: '2.1vh',
              }}
              className={'default-bottom-margin'}
            >
              Предоставьте нам следующие данные
            </div>

            <FlexboxGrid style={{ flexWrap: 'wrap' }}>
              <CustomInput
                key={1}
                value={firstName}
                placeholder={'Имя'}
                textRules={'Минимум 2 символа'}
                onChange={(newValue) => {
                  updateFirstName(newValue)
                }}
                ruleHandler={(value) => {
                  return value.length < 2
                }}
              />

              <CustomInput
                key={2}
                value={lastName}
                placeholder={'Фамилия'}
                textRules={'Минимум 2 символа'}
                onChange={(newValue) => {
                  updateLastName(newValue)
                }}
                ruleHandler={(value) => {
                  return value.length < 2 || value.length === 0
                }}
              />

              <CustomInput
                key={3}
                value={email}
                placeholder={'E-mail'}
                textRules={'Введите Вашу электронную почту'}
                onChange={(newValue) => {
                  updateEmail(newValue)
                }}
                ruleHandler={(value) => {
                  const re = /\S+@\S+\.\S+/
                  return !re.test(value) && value.length > 0
                }}
              />

              <CustomInput
                key={4}
                value={password}
                isPassword={true}
                placeholder={'Пароль'}
                textRules={'Минимум 8 символов'}
                onChange={(newValue) => {
                  updatePassword(newValue)
                }}
                ruleHandler={(value) => {
                  return value.length < 8 || value.length === 0
                }}
              />
              <CustomInput
                key={5}
                value={passwordConfirm}
                isPassword={true}
                placeholder={'Подтверди пароль'}
                textRules={'Минимум 8 символов'}
                onChange={(newValue) => {
                  updatePasswordConfirm(newValue)
                }}
                ruleHandler={(value) => {
                  return value.length < 8 || value.length === 0
                }}
              />
            </FlexboxGrid>

            <FlexboxGrid
              justify='center'
              align='middle'
              style={{
                flexWrap: 'wrap',
              }}
            >
              <button
                className={'reg-button-base'}
                style={{
                  backgroundColor: '#141C22',
                  color: '#D2D6D9',
                  marginBottom: '1em',
                  marginLeft: '1em',
                  marginRight: '1em',
                }}
                onClick={makeNewUser}
              >
                Присоедениться
              </button>
              <button
                className={'reg-button-base'}
                style={{
                  backgroundColor: '#D3D7DA',
                  color: '#141C22',
                  marginBottom: '1em',
                  marginLeft: '1em',
                  marginRight: '1em',
                }}
                onClick={() => navigate('/')}
              >
                Я передумал
              </button>
            </FlexboxGrid>
            <FlexboxGrid
              justify='center'
              align='middle'
              className={'second-font-size'}
              style={{
                textAlign: 'center',
              }}
            >
              Имеются вопросы?
              <button
                style={{
                  background: 'none',
                  color: 'inherit',
                  border: 'none',
                  font: 'inherit',
                  cursor: 'pointer',
                  outline: 'inherit',
                  textDecoration: 'underline',
                }}
              >
                Задайте их нам!
              </button>
            </FlexboxGrid>
          </FlexboxGrid>
        </FlexboxGrid>
      </Content>
    </Container>
  )
}
