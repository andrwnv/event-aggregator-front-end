import React, { useState } from 'react'

import Carousel from 'rsuite/Carousel'

import './EventCard.css'
import { FlexboxGrid } from 'rsuite'
import { DislikeObject, LikeObject } from '../../api/like.api'
import { ObjectType } from '../../api/const'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

type EventCardProps = {
    id: string;
    title: string;
    shortText: string;
    location: string;
    pictureLinks: string[];
    dates: Date[],
    liked: boolean
};

function datesToString(dates: Date[]): string {
    if (dates.length < 2)
        return ''
    return `${dates[0].getDate()}.${dates[0].getMonth()}.${dates[0].getFullYear()} - ${dates[1].getDate()}.${dates[1].getMonth()}.${dates[1].getFullYear()}`
}

export default function EventCard(props: EventCardProps) {
    const [liked, setLike] = useState(props.liked)

    const { user } = useAuth()

    const navigate = useNavigate()

    const openMoreInfo = () => {
        let type = ObjectType.PLACE
        if (props.dates.length === 2)
            type = ObjectType.EVENT

        navigate(`/${type}/${props.id}`)
    }

    const likeHandler = () => {
        if (!user)
            return

        if (liked)
            DislikeObject(props.id).then(res => {
                if (res)
                    setLike(false)
            })
        else
            LikeObject(props.id, props.dates.length === 0 ? ObjectType.PLACE : ObjectType.EVENT).then(res => {
                if (res)
                    setLike(true)
            })
    }

    return (
        <FlexboxGrid className={'event-card-root'} key={props.id}>
            <div style={{ padding: '17px' }}>
                <Carousel
                    style={{ borderRadius: '2%', display: 'flex', padding: 0, height: '200px' }}
                    shape={'bar'}
                    placement={'bottom'}
                    autoplay={true}
                    autoplayInterval={5000}
                >
                    {props.pictureLinks.map(link => {
                        return (
                            <img
                                src={link}
                                className={'event-card-img'}
                                alt={`${props.title}.img`}
                                key={`${link}`}
                            />
                        )
                    })}
                </Carousel>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <div className={'event-card-title text-primary-color'}>{props.title}</div>
                <div className={'event-card-second-text text-primary-color'}
                     style={{ display: 'flex', alignItems: 'center' }}
                >
                    <svg width='15' height='19' viewBox='0 0 56 86' fill='none'
                         style={{ marginRight: '7px' }}
                    >
                        <path
                            d='M28 2C14.3565 2 2 13.4851 2 27.6568C2 41.825 13.2742 58.7405 28 83C42.7258 58.7405 54 41.825 54 27.6568C54 13.4851 41.6467 2 28 2ZM28 39.125C22.6148 39.125 18.25 34.5924 18.25 29C18.25 23.4076 22.6148 18.875 28 18.875C33.3852 18.875 37.75 23.4076 37.75 29C37.75 34.5924 33.3852 39.125 28 39.125Z'
                            stroke='black' strokeWidth='3' />
                    </svg>
                    {props.location}
                </div>
            </div>

            <FlexboxGrid align={'middle'} justify={'start'} style={{ width: '100%', height: '20vh' }}>
                <div className={'event-card-second-text text-primary-color'}>
                    <div>
                        {props.dates.length >= 2 &&
                            <div>{datesToString(props.dates)} <br /></div>
                        }
                        {props.shortText}
                    </div>
                </div>
            </FlexboxGrid>

            <FlexboxGrid justify={'space-between'} style={{ flexDirection: 'row', width: '100vw' }}>
                <button className={`event-card-button ${user === undefined && 'event-card-long'}`}
                        onClick={openMoreInfo}>Подробнее
                </button>
                {
                    user !== undefined && (
                        <button className={'event-card-button'} onClick={likeHandler}>
                            <svg
                                width='20' height='20'
                                viewBox='0 0 20 20' fill='none'
                                style={{ display: 'block', margin: '0 auto' }}
                            >
                                <path
                                    d='M9.99988 18.8542L1.70645 10.5608C0.704946 9.55929 0.15332 8.2276 0.15332 6.81101C0.15332 5.39463 0.704946 4.06294 1.70667 3.06143C2.70817 2.05993 4.03987 1.5083 5.45624 1.5083C6.87261 1.5083 8.2043 2.05993 9.20603 3.06143L9.99988 3.8555L10.7942 3.06143C11.7955 2.05993 13.1271 1.5083 14.5437 1.5083C15.9603 1.5083 17.292 2.05993 18.2933 3.06165C19.2948 4.06294 19.8464 5.39463 19.8464 6.81101C19.8464 8.2276 19.2948 9.55929 18.2931 10.5606L9.99988 18.8542ZM5.45602 3.2588C4.50725 3.2588 3.61515 3.62816 2.94427 4.29926C2.27339 4.97014 1.90382 5.86223 1.90382 6.81101C1.90382 7.75978 2.27339 8.65209 2.94427 9.32275L9.99988 16.3784L17.0553 9.32297C17.7266 8.65209 18.0959 7.76 18.0959 6.81101C18.0959 5.86223 17.7266 4.97014 17.0555 4.29926C16.3846 3.62838 15.4923 3.2588 14.5437 3.2588C13.5952 3.2588 12.7029 3.62816 12.032 4.29926L9.99988 6.33115L7.96799 4.29926C7.29689 3.62838 6.40501 3.2588 5.45602 3.2588Z'
                                    fill={liked ? '#ED668A' : 'white'} />
                            </svg>
                        </button>
                    )
                }
            </FlexboxGrid>
        </FlexboxGrid>
    )
}
