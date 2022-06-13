import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Sidebar, Sidenav, Nav, Navbar, FlexboxGrid } from 'rsuite'

import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine'
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine'
import Dashboard from '@rsuite/icons/Dashboard'

import ClickableMapComponent from '../../components/clickable-map/ClickableMap'
import { GeoPoint } from '../../misc/GeoPoint'
import { ReactComponent as Logo } from '../../misc/icons/logo.svg'

import LocationIcon from '@rsuite/icons/Location'
import RandomIcon from '@rsuite/icons/Random'
import TimeIcon from '@rsuite/icons/Time'
import RelatedMapIcon from '@rsuite/icons/RelatedMap'
import SearchIcon from '@rsuite/icons/Search'

import './ExplorePage.css'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/search-bar/SearchBar'

const NavToggle = ({ expand, onChange }: any) => {
    return (
        <Navbar appearance='subtle' className='nav-toggle'>
            <Nav pullRight>
                <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                    {expand ? <ArrowLeftLineIcon /> : <ArrowRightLineIcon />}
                </Nav.Item>
            </Nav>
        </Navbar>
    )
}

export default function ExplorePage() {
    const [expand, setExpand] = useState(false)
    const [active, setActive] = React.useState('2')
    const [initialPosition, setInitialPosition] = useState<GeoPoint>({ lat: 55.755793, lon: 37.617134 })
    const navigate = useNavigate()

    // const {user, logout} = useAuth();

    const updateGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            setInitialPosition({ lat: latitude, lon: longitude })
        })
    }

    useEffect(() => {
        updateGeoLocation()
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
                    <div className={'explore-header'} onClick={() => setExpand(!expand)}>
                        <FlexboxGrid justify={'center'} align={'middle'}>
                            <Logo fill={'#fff'} style={{ width: '2em' }} />
                            <span style={expand ? { display: 'flex', marginLeft: 12 } : { display: 'none' }}
                                  className={'explore-header-title'}> Take place</span>
                        </FlexboxGrid>
                    </div>
                </Sidenav.Header>
                <Sidenav expanded={expand} appearance='subtle'>
                    <Sidenav.Body>
                        <Nav activeKey={active} onSelect={(eventKey) => {
                            setActive(eventKey)
                        }}>
                            {
                                expand
                                    ? <SearchBar foundItemsHandler={(items) => {
                                    }} />
                                    : <Nav.Item eventKey='0' icon={<SearchIcon />} onClick={() => {
                                        setExpand(true)
                                    }}>Поиск</Nav.Item>
                            }

                            <Nav.Item eventKey='1' icon={<Dashboard />} onClick={() => {
                                setActive('2')
                                navigate('/')
                            }}>
                                На главную
                            </Nav.Item>
                            <Nav.Item eventKey='2' icon={<LocationIcon />} onClick={updateGeoLocation}>
                                Рядом со мной
                            </Nav.Item>
                            <Nav.Item eventKey='3' icon={<TimeIcon />}>
                                Только события
                            </Nav.Item>
                            <Nav.Item eventKey='4' icon={<RelatedMapIcon />}>
                                Только места
                            </Nav.Item>
                            <Nav.Item eventKey='5' icon={<RandomIcon />}>
                                Вперемешку
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
