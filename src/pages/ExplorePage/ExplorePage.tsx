import React, { useCallback, useEffect, useState } from 'react'
import { Container, Sidebar, Sidenav, Nav, Navbar, FlexboxGrid } from 'rsuite'

import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine'
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine'
import Dashboard from '@rsuite/icons/Dashboard'

import ClickableMapComponent from '../../components/clickable-map/ClickableMap'
import { GeoPoint } from '../../misc/GeoPoint'
import { ReactComponent as Logo } from '../../misc/icons/logo.svg'

import './ExplorePage.css'
import { useNavigate } from 'react-router-dom'

const NavToggle = ({ expand, onChange }: any) => {
    return (
        <Navbar appearance='subtle' className='nav-toggle'>
            <Navbar.Body>
                <Nav pullRight>
                    <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                        {expand ? <ArrowLeftLineIcon /> : <ArrowRightLineIcon />}
                    </Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    )
}

export default function ExplorePage() {
    const [expand, setExpand] = useState(false)
    const [active, setActive] = React.useState('1')
    const [initialPosition, setInitialPosition] = useState<GeoPoint>({ lat: 55.755793, lon: 37.617134 })
    const navigate = useNavigate()
    // const {user, logout} = useAuth();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            setInitialPosition({ lat: latitude, lon: longitude })
        })
    }, [])

    const Map = useCallback(() => (
        <ClickableMapComponent
            defaultCoord={initialPosition}
            handler={
                (point: GeoPoint) => {
                    alert(`${point.lat} ${point.lon}`)
                }
            }
            eventsPositions={[{ lat: 55.755793, lon: 37.617134 }, {
                lat: 55.7665309,
                lon: 37.767219543,
            }, { lat: 55.6781651, lon: 37.84721374 }]}
        />
    ), [initialPosition])

    return (
        <Container>
            <Sidebar
                style={{ display: 'flex', flexDirection: 'column' }}
                width={expand ? 360 : 56}
                collapsible
            >
                <Sidenav.Header>
                    <div className={'explore-header'} onClick={() => navigate('/')}>
                        <FlexboxGrid justify={'center'} align={'middle'}>
                            <Logo fill={'#fff'} style={{ width: '2em' }} />
                            <span style={expand ? { display: 'flex', marginLeft: 12 } : {display: 'none'} } className={'explore-header-title'}> Take place</span>
                        </FlexboxGrid>
                    </div>
                </Sidenav.Header>
                <Sidenav expanded={expand} appearance='subtle'>
                    <Sidenav.Body>
                        <Nav activeKey={active} onSelect={(eventKey) => {
                            setActive(eventKey)
                        }}>
                            <Nav.Item eventKey='1' icon={<Dashboard />}>
                                Dashboard
                            </Nav.Item>
                            <Nav.Item eventKey='2'>
                                User Group
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    marginTop: 'auto',
                }}>
                    <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
                </div>
            </Sidebar>

            <Map />

        </Container>
    )
}
