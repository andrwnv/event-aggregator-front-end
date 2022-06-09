import React, { useState } from 'react'
import { Dropdown, FlexboxGrid, Header, Navbar, Nav } from 'rsuite'
import { useNavigate } from 'react-router-dom'

import CreateObjModal from '../create-object-modal/CreateObjModal'
import { ReactComponent as Logo } from '../../misc/icons/logo.svg'
import useAuth from '../../hooks/useAuth'

import './TakePlaceHeader.css'

export default function TakePlaceHeader() {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [newObjModelOpen, setOpenNewObjModal] = useState(false)

    const UserNavPanel = () => {
        return user === undefined
            ? (
                <>
                    <Nav.Item className={'nav-item-style'}
                              onClick={() => navigate('/sign_up')}>
                        Зарегистрироваться
                    </Nav.Item>
                    <Nav.Item className={'nav-item-style'}
                              onClick={() => navigate('/sign_in')}>
                        Войти
                    </Nav.Item>
                </>
            )
            : (
                <Nav.Item className={'nav-item-style'}
                          onClick={() => navigate('/profile/me')}>
                    Мой аккаунт
                </Nav.Item>
            )
    }

    const NavHeader = () => (
        <Navbar.Brand style={{ padding: 0 }}>
            <Nav.Item className={'nav-item-style'} onClick={() => navigate('/')}>
                <Logo fill={'#141C22'} style={{ width: '4em' }} />
                <div className='logo-style'>TAKE PLACE</div>
            </Nav.Item>
        </Navbar.Brand>
    )

    const NavItems = () => (
        <>
            <Nav.Item className={'nav-item-style'} onClick={() => navigate('/explore')}>
                Осмотреться
            </Nav.Item>
            <Nav.Item className={'nav-item-style'} onClick={() => navigate('/histories')}>
                Истории
            </Nav.Item>
            {
                user !== undefined && (
                    <Nav.Item onClick={() => {
                        setOpenNewObjModal(true)
                    }}>
                        Создать объявление
                    </Nav.Item>
                )
            }
        </>
    )

    return (
        <Header>
            <CreateObjModal show={newObjModelOpen} onClose={() => {
                setOpenNewObjModal(false)
            }} />
            <FlexboxGrid justify='center' align='middle' className={'adaptive-flex'}>
                <FlexboxGrid.Item className={'adaptive-flex-inner'} colspan={20}>
                    <Navbar className={'take-place-header nav-item-style'}>
                        <NavHeader />

                        <Nav>
                            <NavItems />
                        </Nav>

                        <Nav pullRight>
                            <UserNavPanel />
                        </Nav>
                    </Navbar>

                    <Navbar className={'take-place-header-adaptive nav-item-style'}>
                        <NavHeader />

                        <Nav pullRight>
                            <Dropdown title='Меню' placement='bottomEnd'>
                                <NavItems />
                                <UserNavPanel />
                            </Dropdown>
                        </Nav>
                    </Navbar>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Header>
    )
}
