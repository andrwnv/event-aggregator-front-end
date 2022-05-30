import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import './RegistrationConfirmPage.css'
import '../RegistrationPage.css'
import { Content, FlexboxGrid } from 'rsuite'

export default function RegistrationConfirmPage() {
  const navigate = useNavigate()

  const jwt = localStorage.getItem('auth-key')
  if (jwt !== null) {
    return <Navigate to='/' replace={true} />
  }

  return (
    <FlexboxGrid justify='center' align='middle' className={'root-container-reg'}>
      <FlexboxGrid.Item colspan={15} className={'confirm-bg'}>
        <Content
          className={'default-bottom-margin'}
          style={{
            fontWeight: 600,
            fontSize: '3vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>Добро пожаловать!</div>
          <div style={{ textAlign: 'center', fontSize: '0.7em' }}>Регистрация прошла успешно</div>

          <div
            style={{
              display: 'flex',
              marginBottom: '1vh',
              marginTop: '2.5vh',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <button
              className={'reg-button-base'}
              style={{
                backgroundColor: '#141C22',
                color: '#D2D6D9',
                marginBottom: '3vh',
                marginLeft: 0,
              }}
            >
              <div
                className={'second-font-size'}
                style={{
                  paddingLeft: '6vw',
                  paddingRight: '6vw',
                }}
                onClick={() => {
                  navigate('/', { replace: true })
                }}
              >
                Отлично
              </div>
            </button>

            <div
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
            </div>
          </div>
        </Content>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}
