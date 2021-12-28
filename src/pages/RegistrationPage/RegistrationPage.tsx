import React, { useState } from 'react';

import MiniProfile from '../../components/mini-profile/MiniProfile';
import CustomInput from '../../components/custom-input/CustomInput';

import '../../fonts.css';
import './RegistrationPage.css';

export default function RegistrationPage() {
    const [firstName, updateFirstName] = useState('');
    const [lastName, updateLastName] = useState('');
    const [email, updateEmail] = useState('');
    const [nickname, updateNickName] = useState('');
    const [password, updatePassword] = useState('');

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
                            value={nickname}
                            placeholder={'Никнейм'}
                            textRules={'Минимум 5 символов'}
                            onChange={(newValue) => {
                                updateNickName(newValue);
                            }}
                            ruleHandler={(value) => {
                                return value.length < 5 || value.length === 0;
                            }}
                        />

                        <CustomInput
                            key={5}
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
                            }}>
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
