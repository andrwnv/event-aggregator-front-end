import React from 'react';

import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import RegistrationConfirmPage from './pages/RegistrationPage/RegistrationConfirmPage/RegistrationConfirmPage';
import EventCard from './components/event-card/EventCard';

function App() {
    return (
        <div className="App">
            {/*<RegistrationPage />*/}
            {/*<RegistrationConfirmPage />*/}
            <div style={{
                display: 'flex',
                width: '90%',
                flexDirection: 'row',
            }}>
                {
                    [1, 2, 3, 4].map(() => {
                        return (
                            <EventCard id={'123123-123-123'} title={'New Street Vision Art'}
                                       shortText={'Съешь ещё этих мягких французских булок, да выпей же чаю! Съешь ещё этих мягких французских булок, да выпей же чаю!'}
                                       location={'Россия, Томск'} pictureLinks={[
                                'https://obzor.city/data/images/news_2021/06/street_vision/1_15_.jpg', 'https://www.riatomsk.ru/Upload/sub-9/49078_3.jpg',
                                'https://obzor.city/data/images/news_2017/8/raznoe/dsc0146.jpg', 'https://www.riatomsk.ru/Upload/sub-9/49075_4.jpg',
                                'https://proprikol.ru/wp-content/uploads/2020/05/kartinki-graffiti-45.jpg']}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default App;
