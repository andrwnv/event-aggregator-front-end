import React, { FormEvent, useEffect, useState } from 'react';
import { Container, Content, FlexboxGrid, Message, toaster } from 'rsuite';

import useAuth from '../../hooks/useAuth';

import CustomInput from '../../components/custom-input/CustomInput';
import { ReactComponent as Logo } from '../../misc/icons/logo.svg';

import './SignInPage.css';
import { useNavigate } from 'react-router-dom';

const titleStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '20px'
}

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login, error, loading} = useAuth();
    const navigate = useNavigate();

    const signIn = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login({
            email, password
        })
    }

    return (
        <Container className={'root-container-sign-in'}>
            <Content>
                <form onSubmit={signIn}>
                    <FlexboxGrid align='middle' justify='center' style={{
                        height: '100vh',
                        flexDirection: 'column'
                    }}>
                        <Logo fill={'#D6D9DCA5'} style={{width: '5%'}}/>
                        <div style={{
                            marginBottom: '1em',
                            color: '#D6D9DCA5',
                            fontSize: '1.3em',
                            fontWeight: 600
                        }}>
                            Take Place
                        </div>

                        <FlexboxGrid.Item className={"sign-in-form"}>
                            <CustomInput
                                key={3}
                                value={email}
                                placeholder={'E-mail'}
                                textRules={'Введите Вашу электронную почту'}
                                onChange={(newValue) => {
                                    setEmail(newValue);
                                }}
                                ruleHandler={(value) => {
                                    const re = /\S+@\S+\.\S+/;
                                    return !re.test(value) && value.length > 0;
                                }}
                            />

                            <CustomInput
                                key={4}
                                value={password}
                                isPassword={true}
                                placeholder={'Пароль'}
                                textRules={'Введите ваш пароль'}
                                onChange={(newValue) => {
                                    setPassword(newValue);
                                }}
                                ruleHandler={(value) => {
                                    return value.length < 8 || value.length === 0;
                                }}
                            />

                            { error?.status === 401 && <p style={titleStyle}>Неправильный логин или пароль!</p>}
                            { error?.status === 500 && <p style={titleStyle}>Ошибка сервера попробуй позже</p>}

                            <button className={"reg-button-base"}
                                    style={{
                                        backgroundColor: "#141C22",
                                        color: "#D2D6D9",
                                        marginBottom: '2em'
                                    }} disabled={loading} type='submit'>
                                <div
                                    className={"second-font-size"}
                                    style={{
                                        paddingLeft: "2vw",
                                        paddingRight: "2vw",
                                    }}
                                >
                                    Войти
                                </div>
                            </button>

                            <FlexboxGrid justify="center" align='middle' className={"second-font-size"} style={{
                                textAlign: 'center',
                                color: '#141C22'
                            }}>
                                Впервые здесь?
                                <button style={{
                                    background: "none",
                                    color: "#141C22",
                                    border: "none",
                                    font: "inherit",
                                    cursor: "pointer",
                                    outline: "inherit",
                                    textDecoration: "underline"
                                }} onClick={() => navigate('/sign_up')}>
                                    Тогда присоединяйтесь к нам!
                                </button>
                            </FlexboxGrid>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </form>
            </Content>
        </Container>
    )
}
