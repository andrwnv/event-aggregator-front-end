import React, { useEffect, useState } from 'react'
import { Container, Content, FlexboxGrid } from 'rsuite'

import TakePlaceHeader from '../../components/custom-header/TakePlaceHeader'
import Carousel from 'rsuite/Carousel'
import { useNavigate, useParams } from 'react-router-dom'

import './HistoryPage.css'
import { GetHistory } from '../../api/history.api'
import { User } from '../../types/user.type'
import { templateURL_V1 } from '../../api/const'

const HistoryPage: React.FC<any> = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const [title, setTitle] = useState('Название')
    const [longText, setLongText] = useState('Съешь ещё этих мягких французских булок, да выпей же чаю! Съешь ещё этих мягких французских булок, да выпей же чаю! Съешь ещё этих мягких французских булок, да выпей же чаю! Съешь ещё этих мягких французских булок, да выпей же чаю!Съешь ещё этих мягких французских булок, да выпей же чаю! Съешь ещё этих мягких французских булок, да выпей же чаю!Съешь ещё этих мягких французских булок, да выпей же чаю! Съешь ещё этих мягких французских булок, да выпей же чаю!Съешь ещё этих мягких французских булок, да выпей же чаю! Съешь ещё этих мягких французских булок, да выпей же чаю!')
    const [photos, setPhotos] = useState<string[]>([])
    const [author, setAuthor] = useState<User | undefined>()
    const [createdAt, setCreatedAt] = useState<Date>(new Date)

    useEffect(() => {
        if (id === undefined) {
            navigate('/not_found')
            return
        }

        GetHistory(id).then(res => {
            if (res === null) {
                navigate('/not_found')
                return
            }

            setTitle(res.title)
            setLongText(res.text)
            setPhotos(res.photos)
            setAuthor(res.createdBy)
            setCreatedAt(res.createdAt)
        })
    })

    return (
        <Container className={'main-page-root'}>
            <TakePlaceHeader />

            <Content style={{ marginTop: 15 }}>
                <FlexboxGrid justify='center' align='middle' className={'adaptive-flex'}>
                    <FlexboxGrid.Item className={'adaptive-flex-inner'} colspan={20}>
                        <div className={'object-container'}>
                            <Carousel
                                // className={'object-container-carousel'}
                                shape={'bar'}
                                placement={'bottom'}
                                autoplay={true}
                                autoplayInterval={10000}
                            >
                                {photos?.map(fileName => (
                                        <img id={fileName}
                                            src={`${templateURL_V1}/file/img/${fileName}?uuid=${author?.id}`}
                                             className={'object-container-carousel-img'} alt={`${fileName}.img`} />)
                                )}
                            </Carousel>

                            <div style={{
                                width: '100%',
                            }}>
                                <h3 style={{ marginTop: 15, marginBottom: 15 }}>{title}</h3>
                                <p style={{ fontSize: '1.2em', textAlign: 'justify', marginBottom: 15, whiteSpace: 'pre-wrap' }}>
                                    {longText}
                                </p>

                                <div className={'author-block'}>
                                    <img
                                        className={'comment-my-avatar'}
                                        src={`http://127.0.0.1:9090/api/v1/file/img/8de54f01-37c1-4e3e-a06a-a1f5d77a2363.png?uuid=4fdc0cd0-6331-4421-a3a9-5dff47ea1f0d`}
                                        alt={`user-avatar`}
                                    />

                                    {
                                        author && (
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 600 }}>{author.firstName} {author.secondName}</span>
                                                <span>Дата написания истории: {createdAt.getHours()}:{createdAt.getMinutes()} {createdAt.getDate()}.{createdAt.getMonth()}.{createdAt.getFullYear()} г.</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            <button
                                className={'event-card-button'}
                                onClick={() => {
                                    navigate(`/histories`)
                                }}
                            >
                                Вернуться к другим историям!
                            </button>
                        </div>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>
    )
}

export default HistoryPage
