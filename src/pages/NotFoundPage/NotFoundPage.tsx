import React from 'react'

import { Container, Content, FlexboxGrid } from 'rsuite'
import { useNavigate } from 'react-router-dom'

import './NotFoundPage.css'
import TakePlaceHeader from '../../components/custom-header/TakePlaceHeader'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Container className={'root-container'}>
      <TakePlaceHeader />
      <Content>
        <FlexboxGrid justify='center'>
          <FlexboxGrid.Item colspan={20}>
            <Content
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}
            >
              <div className={'form'}>
                <div className={'not-found'}>404</div>
                Данная страница не найдена
                <button
                  className={'reg-button-base'}
                  style={{
                    backgroundColor: '#141C22',
                    color: '#D2D6D9',
                    marginLeft: 0,
                    marginTop: '25px',
                  }}
                >
                  <div
                    className={'second-font-size'}
                    style={{
                      paddingLeft: '2vw',
                      paddingRight: '2vw',
                    }}
                    onClick={() => {
                      navigate('/', { replace: true })
                    }}
                  >
                    На главную!
                  </div>
                </button>
              </div>
            </Content>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  )
}
