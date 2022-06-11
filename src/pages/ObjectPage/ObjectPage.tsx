import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Container, Content, FlexboxGrid } from 'rsuite'
import TimeIcon from '@rsuite/icons/Time'

import { User } from '../../types/user.type'
import { ObjectType, templateURL_V1 } from '../../api/const'
import { GetObject, ObjectRegion } from '../../api/object.api'

import NotFoundPage from '../NotFoundPage/NotFoundPage'
import TakePlaceHeader from '../../components/custom-header/TakePlaceHeader'
import Carousel from 'rsuite/Carousel'
import ClickableMapComponent from '../../components/clickable-map/ClickableMap'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

type ObjectPageProps = {
    type: ObjectType
}

function dates2string(dates: Date[]): string {
    if (dates.length < 2)
        return ''
    return `${dates[0].getDate()}.${dates[0].getMonth()}.${dates[0].getFullYear()} - ${dates[1].getDate()}.${dates[1].getMonth()}.${dates[1].getFullYear()}`
}


const ObjectPage: React.FC<ObjectPageProps> = ({ type }) => {
    const { id } = useParams()

    const [successStatus, setSuccessStatus] = useState<boolean>(false)

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [paymentRequired, setPaymentRequired] = useState<boolean>(false)
    const [beginDate, setBeginDate] = useState<Date | undefined>(undefined)
    const [endDate, setEndDate] = useState<Date | undefined>(undefined)
    const [latitude, setLatitude] = useState<number>(0)
    const [longitude, setLongitude] = useState<number>(0)
    const [regionInfo, setRegionInfo] = useState<ObjectRegion | undefined>(undefined)
    const [createdBy, setCreator] = useState<User | undefined>(undefined)
    const [images, setImages] = useState<string[]>([])
    const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined)

    const MapComponent = useCallback(() => (
        <MapContainer
            key={'clickable-map-container'}
            center={[latitude, longitude]}
            zoom={15}
            style={{
                height: '30vh',
                borderRadius: 7,
            }}
        >
            <Marker
                key={`${latitude}_${longitude}`}
                position={[latitude, longitude]}
                interactive={false}
            />
            ))
            <TileLayer
                attribution='&amp;copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
        </MapContainer>
    ), [latitude, longitude])

    useEffect(() => {
        if (id === undefined)
            return

        GetObject(id, type).then(info => {
            if (!info)
                return

            setSuccessStatus(true)
            setTitle(info.title)
            setDescription(info.description)
            setPaymentRequired(info.payment_need)
            setLatitude(info.latitude)
            setLongitude(info.longitude)
            setRegionInfo(info.region_info)
            setCreator(info.created_by)
            setImages(info.photos ? info.photos : [])
            setIsLiked(info.liked ? info.liked : false)

            if (type === ObjectType.EVENT && info.begin_date && info.end_date) {
                setBeginDate(new Date(info.begin_date * 1000))
                setEndDate(new Date(info.end_date * 1000))
            }
        })
    }, [])


    if (!successStatus)
        return <NotFoundPage />

    return (
        <Container className={'main-page-root'}>
            <TakePlaceHeader />

            <Content style={{ marginTop: 15 }}>
                <FlexboxGrid justify='center' align='middle' className={'adaptive-flex'}>
                    <FlexboxGrid.Item className={'adaptive-flex-inner'} colspan={20}>
                        <div style={{
                            backgroundColor: '#b8c8d5',
                            borderRadius: 7,
                            padding: 15,
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Carousel
                                    style={{
                                        borderRadius: '2%',
                                        display: 'flex',
                                        padding: 0,
                                        width: '65%',
                                        marginBottom: 15,
                                    }}
                                    shape={'bar'}
                                    placement={'bottom'}
                                    autoplay={true}
                                    autoplayInterval={10000}
                                >
                                    {images.map(fileName => {
                                        return (
                                            <img src={`${templateURL_V1}/file/img/${fileName}?uuid=${createdBy?.id}`}
                                                 className={'event-card-img'} alt={`${fileName}.img`} />
                                        )
                                    })}
                                </Carousel>

                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                        <h3 style={{ marginLeft: 15 }}>{title}</h3>
                                        {
                                            regionInfo && (
                                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 15 }}>
                                                    <svg width='15' height='19' viewBox='0 0 56 86' fill='none'
                                                         style={{ marginRight: '7px' }}
                                                    >
                                                        <path
                                                            d='M28 2C14.3565 2 2 13.4851 2 27.6568C2 41.825 13.2742 58.7405 28 83C42.7258 58.7405 54 41.825 54 27.6568C54 13.4851 41.6467 2 28 2ZM28 39.125C22.6148 39.125 18.25 34.5924 18.25 29C18.25 23.4076 22.6148 18.875 28 18.875C33.3852 18.875 37.75 23.4076 37.75 29C37.75 34.5924 33.3852 39.125 28 39.125Z'
                                                            stroke='black' strokeWidth='3' />
                                                    </svg>
                                                    {regionInfo?.region_name}
                                                </div>
                                            )
                                        }
                                    </div>

                                    {
                                        beginDate !== undefined && endDate !== undefined && (
                                            <div style={{
                                                fontSize: '1.3em',
                                                marginLeft: 15,
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}>
                                                {paymentRequired && <span style={{ marginRight: 5, color: 'green' }}>Необходима оплата</span>}
                                                <div>
                                                    <TimeIcon style={{ marginRight: 5 }} />
                                                    {dates2string([beginDate, endDate])}
                                                </div>
                                            </div>
                                        )
                                    }

                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        justifyContent: 'space-between',
                                        margin: 15,
                                    }}>
                                        <span>{description}</span>

                                        <button
                                            className={'event-card-button'}
                                            onClick={() => {
                                            }}>
                                            <svg
                                                width='20' height='20'
                                                viewBox='0 0 20 20' fill='none'
                                                style={{ display: 'block', margin: '0 auto' }}
                                            >
                                                <path
                                                    d='M9.99988 18.8542L1.70645 10.5608C0.704946 9.55929 0.15332 8.2276 0.15332 6.81101C0.15332 5.39463 0.704946 4.06294 1.70667 3.06143C2.70817 2.05993 4.03987 1.5083 5.45624 1.5083C6.87261 1.5083 8.2043 2.05993 9.20603 3.06143L9.99988 3.8555L10.7942 3.06143C11.7955 2.05993 13.1271 1.5083 14.5437 1.5083C15.9603 1.5083 17.292 2.05993 18.2933 3.06165C19.2948 4.06294 19.8464 5.39463 19.8464 6.81101C19.8464 8.2276 19.2948 9.55929 18.2931 10.5606L9.99988 18.8542ZM5.45602 3.2588C4.50725 3.2588 3.61515 3.62816 2.94427 4.29926C2.27339 4.97014 1.90382 5.86223 1.90382 6.81101C1.90382 7.75978 2.27339 8.65209 2.94427 9.32275L9.99988 16.3784L17.0553 9.32297C17.7266 8.65209 18.0959 7.76 18.0959 6.81101C18.0959 5.86223 17.7266 4.97014 17.0555 4.29926C16.3846 3.62838 15.4923 3.2588 14.5437 3.2588C13.5952 3.2588 12.7029 3.62816 12.032 4.29926L9.99988 6.33115L7.96799 4.29926C7.29689 3.62838 6.40501 3.2588 5.45602 3.2588Z'
                                                    fill={isLiked ? '#ED668A' : 'white'} />
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            </div>

                            <MapComponent />
                        </div>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>
    )
}

export default ObjectPage
