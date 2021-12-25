import React from 'react';

import '../../fonts.css';
import './RegistrationPage.css';
import MiniProfile from '../../components/mini-profile/MiniProfile';


export default function RegistrationPage() {

    return (
        <div className={"root-container-reg"}>
            <div className={"reg-form"}>
                <div className={"default-bottom-margin"} style={{
                    fontWeight: 600,
                    fontSize: "3vh"
                }}>
                    Присоединяйтесь к нам!
                </div>

                <div>
                    <div className={"default-bottom-margin"} style={{
                        fontWeight: 500,
                        fontSize: "2.1vh"
                    }}>
                        Ваш профиль будет выглять так
                    </div>

                    <div style={{
                        // display: 'flex',
                    }} className={"default-bottom-margin"}>
                        <MiniProfile
                            firstName={"Имя"}
                            lastName={"Фамилия"}
                            email={"some_test_email@gmail.com"}
                            location={"г. Томск"}
                            isGuest={false}
                            avatarLink={"https://react.semantic-ui.com/images/avatar/large/matthew.png"}
                            nickname={"andrwnv"}
                        />
                    </div>
                </div>

                <div style={{
                    paddingTop: "2vh",
                }}>
                    <div style={{
                        fontWeight: 500,
                        fontSize: "2.1vh"
                    }} className={"default-bottom-margin"}>
                        Предоставьте нам следующие данные
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap"
                        }}
                    >
                        <div className={"custom-input-container"}>
                            <input type="text" placeholder="Имя" className={"custom-input"}/>
                            <div>Минимум 2 символа</div>
                        </div>

                        <div className={"custom-input-container"}>
                            <input type="text" placeholder="Фамилия" className={"custom-input"}/>
                            <div>Минимум 2 символа</div>
                        </div>

                        <div className={"custom-input-container"}>
                            <input type="text" placeholder="E-mail" className={"custom-input"}/>
                            <div>Введите Вашу электронную почту</div>
                        </div>

                        <div className={"custom-input-container"}>
                            <input type="text" placeholder="Никнейм" className={"custom-input"}/>
                            <div>Введите желаймый никнейм</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
