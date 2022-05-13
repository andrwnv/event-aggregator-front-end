import React, { useState } from 'react';

import { Message, toaster } from 'rsuite';
import { useNavigate } from 'react-router-dom';

import MiniProfile from '../../components/mini-profile/MiniProfile';
import CustomInput from '../../components/custom-input/CustomInput';

import '../../fonts.css';
import './RegistrationPage.css';

import { CreateUser } from '../../api/user.api';

export default function RegistrationPage() {
    const [firstName, updateFirstName] = useState('');
    const [lastName, updateLastName] = useState('');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [passwordConfirm, updatePasswordConfirm] = useState('');

    const navigate = useNavigate();

    // Message box creator
    const spawnMessageBox = (message: string) => (
        <Message showIcon type={'error'} closable={true}>
            Ошибка: {message}
        </Message>
    );

    const makeNewUser = async () => {
        if (!firstName.length || !lastName.length || !email.length || !password.length || !passwordConfirm.length) {
            toaster.push(spawnMessageBox('Введены не все необходимые данные!'), {placement: 'bottomCenter'})
            return
        }

        if (password !== passwordConfirm) {
            toaster.push(spawnMessageBox('Пароли не совпадают!'), {placement: 'bottomCenter'})
            return
        }

        const result = await CreateUser({email: email, firstName: firstName, secondName: lastName, password: password})
        if (result.status === 409) {
            toaster.push(spawnMessageBox('Пользователь уже существует!'), {placement: 'bottomCenter'})
        } else if (result.status === 500) {
            toaster.push(spawnMessageBox('Пробелмы с сервером, попробуйте позже('), {placement: 'bottomCenter'})
        }

        if (result.status === 201) {
            navigate('confirmed')
        }
    }

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

                    <div className={"default-bottom-margin"}>
                        <MiniProfile
                            firstName={firstName.length > 0 ? firstName : 'Имя'}
                            lastName={lastName.length > 0 ? lastName : 'Фамилия'}
                            email={email.length > 0 ? email : 'your_email@your_email.ru'}
                            location={"г. Томск"}
                            isGuest={false}
                            avatarLink={"https://react.semantic-ui.com/images/avatar/large/matthew.png"}
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
                        <CustomInput
                            key={1}
                            value={firstName}
                            placeholder={'Имя'}
                            textRules={'Минимум 2 символа'}
                            onChange={(newValue) => {
                                updateFirstName(newValue);
                            }}
                            ruleHandler={(value) => {
                                return value.length < 2;
                            }}
                        />

                        <CustomInput
                            key={2}
                            value={lastName}
                            placeholder={'Фамилия'}
                            textRules={'Минимум 2 символа'}
                            onChange={(newValue) => {
                                updateLastName(newValue);
                            }}
                            ruleHandler={(value) => {
                                return value.length < 2 || value.length === 0;
                            }}
                        />

                        <CustomInput
                            key={3}
                            value={email}
                            placeholder={'E-mail'}
                            textRules={'Введите Вашу электронную почту'}
                            onChange={(newValue) => {
                                updateEmail(newValue);
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
                            textRules={'Минимум 8 символов'}
                            onChange={(newValue) => {
                                updatePassword(newValue);
                            }}
                            ruleHandler={(value) => {
                                return value.length < 8 || value.length === 0;
                            }}
                        />
                        <CustomInput
                            key={5}
                            value={passwordConfirm}
                            isPassword={true}
                            placeholder={'Подтверди пароль'}
                            textRules={'Минимум 8 символов'}
                            onChange={(newValue) => {
                                updatePasswordConfirm(newValue);
                            }}
                            ruleHandler={(value) => {
                                return value.length < 8 || value.length === 0;
                            }}
                        />
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    marginBottom: "1vh"
                }}>
                    <button className={"reg-button-base"}
                            style={{
                                backgroundColor: "#141C22",
                                color: "#D2D6D9"
                            }}
                            onClick={makeNewUser}>
                        Присоедениться
                    </button>
                    <button className={"reg-button-base"}
                            style={{
                                backgroundColor: "#D3D7DA",
                                color: "#141C22"
                            }}>
                        Я передумал
                    </button>
                </div>
                <div>
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
    );
}
