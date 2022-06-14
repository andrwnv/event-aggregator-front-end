import React, { useCallback, useEffect, useState } from 'react'
import { Container, FlexboxGrid, Nav, Navbar, Sidebar, Sidenav } from 'rsuite'

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
import { SearchByValue, SearchNearby, SearchResult } from '../../api/search.api'
import { ObjectType } from '../../api/const'

export enum SearchType {
    ByValue = 0,
    ByLocation
}

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

let firstInit = false

export default function ExplorePage() {
    const [expand, setExpand] = useState(false)
    const [active, setActive] = useState('2')
    const [initialPosition, setInitialPosition] = useState<GeoPoint>({ lat: 55.755793, lon: 37.617134 })
    const [objects, setObjects] = useState<SearchResult[]>([])
    const [searchType, setSearchType] = useState<SearchType>(SearchType.ByLocation)
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchBy, setSearchBy] = useState<ObjectType[]>([])

    const navigate = useNavigate()

    const updateGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            setInitialPosition({ lat: latitude, lon: longitude })
            SearchNearby({
                coords: { lat: latitude, lon: longitude },
                types: searchBy,
                from: 0,
                limit: 50
            }).then(res => {
                setObjects(res)
            }).catch()
        })
    }

    useEffect(() => {
        if (searchType === SearchType.ByLocation && !firstInit) {
            firstInit = true
            updateGeoLocation()
        } else if (searchType === SearchType.ByLocation) {
            SearchNearby({
                coords: initialPosition,
                types: searchBy,
                from: 0,
                limit: 50
            }).then(res => {
                setObjects(res)
            }).catch()
        }
        else {
            SearchByValue({
                from: 0,
                limit: 50,
                types: searchBy,
                value: searchValue
            }).then(res => {
                setObjects(res)
            }).catch()
        }
    }, [searchBy])

    const Map = useCallback(() => (
        <ClickableMapComponent
            defaultCoords={initialPosition}
            handler={
                (point: GeoPoint) => {
                    setInitialPosition({ lat: point.lat, lon: point.lon })
                    SearchNearby({
                        coords: point,
                        types: searchBy,
                        from: 0,
                        limit: 50
                    }).then(res => {
                        setObjects(res)
                    }).catch()
                }
            }
            objects={objects}
        />
    ), [initialPosition, objects, searchBy])

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
                                    ? <SearchBar
                                        searchValueCallback={
                                            (value: string) => {
                                                setSearchType(SearchType.ByValue)
                                                setSearchValue(value)

                                                SearchByValue({
                                                    from: 0,
                                                    limit: 50,
                                                    types: [],
                                                    value: value
                                                }).then(res => {
                                                    setObjects(res)
                                                }).catch(err => console.log(err))
                                            }
                                        }
                                        searchClearedCallback={
                                            () => {
                                                setSearchType(SearchType.ByLocation)
                                                SearchNearby({
                                                    coords: {
                                                        lat: initialPosition.lat,
                                                        lon: initialPosition.lon
                                                    },
                                                    types: [],
                                                    from: 0,
                                                    limit: 50
                                                }).then(res => {
                                                    setObjects(res)
                                                }).catch(err => console.log(err))
                                            }
                                        }

                                    />
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
                            <Nav.Item eventKey='3' icon={<TimeIcon />} onClick={() => setSearchBy([ObjectType.EVENT])}>
                                Только события
                            </Nav.Item>
                            <Nav.Item eventKey='4' icon={<RelatedMapIcon />} onClick={() => setSearchBy([ObjectType.PLACE])}>
                                Только места
                            </Nav.Item>
                            <Nav.Item eventKey='5' icon={<RandomIcon />} onClick={() => setSearchBy([])}>
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
