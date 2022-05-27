import React, { useRef } from 'react';
import { Container, Content, Footer, FlexboxGrid } from 'rsuite';

import useAuth from '../../hooks/useAuth';
import EventCard from '../../components/event-card/EventCard';
import TakePlaceHeader from '../../components/custom-header/TakePlaceHeader';
import { useDraggable } from 'react-use-draggable-scroll';

import './MainPage.css';

export default function MainPage() {
    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

    const {user} = useAuth();
    const {events} = useDraggable(ref, {
        applyRubberBandEffect: true,
    });

    console.log(user);
    return (
        <Container className={'main-page-root'}>
            <TakePlaceHeader/>

            <Content>
                <FlexboxGrid justify="center" align='middle' className={'adaptive-flex'}>
                    <FlexboxGrid.Item className={'adaptive-flex-inner'} colspan={20}>
                        <h3 style={{paddingLeft: '14px', marginTop: '1em', color: '#E3EBF1'}}>
                            Интересное
                        </h3>

                        <Content className={'scroll-area'} ref={ref} {...events}>
                            {
                                [1, 2, 3, 4, 5].map(() => {
                                    return (
                                        <div className={'scroll-item scroll-item-sizes'}>
                                            <EventCard id={'123123-123-123'} title={'New Street Vision Art'}
                                                       shortText={'Съешь ещё этих мягких французских булок, да выпей же чаю! Съешь ещё этих мягких французских булок, да выпей же чаю!'}
                                                       location={'Россия, Томск'} pictureLinks={[
                                                'https://www.riatomsk.ru/Upload/sub-9/49078_3.jpg',
                                                'https://obzor.city/data/images/news_2017/8/raznoe/dsc0146.jpg', 'https://www.riatomsk.ru/Upload/sub-9/49075_4.jpg',
                                                'https://proprikol.ru/wp-content/uploads/2020/05/kartinki-graffiti-45.jpg']}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </Content>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>

            <Footer>

            </Footer>
        </Container>
    );
}
