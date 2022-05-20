import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import MiniProfile from '../../../components/mini-profile/MiniProfile';

import './RegistrationConfirmPage.css';
import '../RegistrationPage.css';


export default function RegistrationConfirmPage() {
    const navigate = useNavigate();

    const jwt = localStorage.getItem('auth-key');
    if (jwt !== null) {
        return <Navigate to='/' replace={true} />
    }

    return (
        <div className={"root-container-reg"}>
            <div className={"confirm-bg"}>
                <div className={"default-bottom-margin"} style={{
                    fontWeight: 600,
                    fontSize: "3vh"
                }}>
                    <div style={{textAlign: 'center'}}>
                        Добро пожаловать!
                    </div>

                    <div className={"default-bottom-margin"}
                        style={{
                            marginTop: '15vh',
                            marginBottom: '15vh'
                        }}
                    >
                        <MiniProfile
                            firstName={'Имя'}
                            lastName={'Фамилия'}
                            email={'your_email@your_email.ru'}
                            location={"г. Томск"}
                            isGuest={false}
                            avatarLink={"https://react.semantic-ui.com/images/avatar/large/matthew.png"}
                        />
                    </div>

                    <div style={{
                        display: "flex",
                        marginBottom: "1vh",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}>
                        <button className={"reg-button-base"}
                                style={{
                                    backgroundColor: "#141C22",
                                    color: "#D2D6D9",
                                    marginBottom: "3vh",
                                    marginLeft: 0
                                }}>
                            <div
                                className={"second-font-size"}
                                style={{
                                    paddingLeft: "6vw",
                                    paddingRight: "6vw"
                                }}
                                onClick={() => {navigate('/', {replace: true})}}
                            >
                                    Отлично
                            </div>
                        </button>

                        <div className={"second-font-size"}>
                            Имеются вопросы?
                            <button style={{
                                background: "none",
                                color: "inherit",
                                border: "none",
                                font: "inherit",
                                cursor: "pointer",
                                outline: "inherit",
                                textDecoration: "underline"
                            }}>
                                Задайте их нам!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
