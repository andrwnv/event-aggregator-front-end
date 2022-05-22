import React from 'react';
import { Container, Content, InputPicker, Footer, Header } from 'rsuite';

import {Countries} from '../../countries';
import useAuth from '../../hooks/useAuth';

export default function MainPage() {
    const {user} = useAuth();
    console.log(user);
    return (
        <Container>
            <Header>
                HI
            </Header>
            <Content>
                <InputPicker data={Countries} style={{ width: 300 }}>
                </InputPicker>
                {/*<Dropdown>*/}
                {/*    <Dropdown.Item>*/}
                {/*        "qweqwe"*/}
                {/*    </Dropdown.Item>*/}
                {/*    <Dropdown.Item>*/}
                {/*        "qweqwe"*/}
                {/*    </Dropdown.Item>*/}
                {/*    {*/}
                {/*        Countries.map(item => (*/}
                {/*            <Dropdown.Item>*/}
                {/*                {item.name}*/}
                {/*            </Dropdown.Item>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</Dropdown>*/}
            </Content>
            <Footer>

            </Footer>
        </Container>
    );
}
