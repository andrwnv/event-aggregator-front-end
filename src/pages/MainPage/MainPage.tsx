import React, { useEffect, useRef, useState } from 'react'
import { Container, Content, FlexboxGrid, Footer } from 'rsuite'

import useAuth from '../../hooks/useAuth'
import EventCard from '../../components/event-card/EventCard'
import TakePlaceHeader from '../../components/custom-header/TakePlaceHeader'
import { useDraggable } from 'react-use-draggable-scroll'

import { IsLiked } from '../../api/like.api'
import { GetObjects, ObjectData } from '../../api/object.api'
import { ObjectTypes, templateURL_V1 } from '../../api/const'

import './MainPage.css'

export default function MainPage() {
    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
    const [objects, setObjects] = useState<ObjectData[]>([])
    const { user } = useAuth()

    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true,
    })

    useEffect(() => {
        GetObjects(1, 5, ObjectTypes.PLACE).then(places => {
            GetObjects(1, 5, ObjectTypes.EVENT).then(async events => {
                let objs = [...places, ...events]
                if (user !== undefined) {
                    for (let object of objs) {
                        object.liked = await IsLiked(object.id)
                    }
                }
                setObjects(objs)
            })
        })
    }, [])

    return (
        <Container className={'main-page-root'}>
            <TakePlaceHeader />

            <Content>
                <FlexboxGrid justify='center' align='middle' className={'adaptive-flex'}>
                    <FlexboxGrid.Item className={'adaptive-flex-inner'} colspan={20}>
                        <h3 style={{ paddingLeft: '14px', marginTop: '1em', color: '#E3EBF1' }}>
                            Интересное
                        </h3>

                        <Content className={'scroll-area'} ref={ref} {...events}>
                            {
                                objects.map((item: ObjectData) => {
                                    if (item.photos === null || item.photos === undefined)
                                        return <></>

                                    let imgUrls = []
                                    for (const img of item.photos)
                                        imgUrls.push(`${templateURL_V1}/file/img/${img}?uuid=${item.created_by.id}`)

                                    let dates: Date[] = []
                                    if (item.begin_date !== undefined && item.end_date !== undefined) {
                                        dates.push(
                                            new Date(item.begin_date * 1000),
                                            new Date(item.end_date * 1000))
                                    }

                                    return (
                                        <div className={'scroll-item scroll-item-sizes'} id={`${item.id}_root`}>
                                            <EventCard id={item.id} title={item.title}
                                                       shortText={item.description}
                                                       location={item.region_info.region_name}
                                                       pictureLinks={imgUrls} dates={dates}
                                                       liked={item.liked === undefined ? false : item.liked}
                                            />
                                        </div>
                                    )
                                })

                                // [1, 2, 3, 4, 5].map(() => {
                                //     return (
                                //         <div className={'scroll-item scroll-item-sizes'}>
                                //             <EventCard id={'123123-123-123'} title={'New Street Vision Art'}
                                //                        shortText={'Съешь ещё этих мягких французских булок, да выпей же чаю! Съешь ещё этих мягких французских булок, да выпей же чаю!'}
                                //                        location={'Россия, Томск'} pictureLinks={[
                                //                 'https://www.riatomsk.ru/Upload/sub-9/49078_3.jpg',
                                //                 'https://obzor.city/data/images/news_2017/8/raznoe/dsc0146.jpg', 'https://www.riatomsk.ru/Upload/sub-9/49075_4.jpg',
                                //                 'https://proprikol.ru/wp-content/uploads/2020/05/kartinki-graffiti-45.jpg']}
                                //             />
                                //         </div>
                                //     );
                                // })
                            }
                        </Content>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>

            <Footer>

            </Footer>
        </Container>
    )
}
