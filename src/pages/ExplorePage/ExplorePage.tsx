import React, { useState } from 'react';
import { Container, Sidebar, Sidenav, Nav, Navbar } from 'rsuite';

import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import Dashboard from '@rsuite/icons/Dashboard';
import LogoAnalytics from '@rsuite/icons/legacy/LogoAnalytics';

import ClickableMapComponent from '../../components/clickable-map/ClickableMap';
import { GeoPoint } from '../../misc/GeoPoint';
// import useAuth from '../../hooks/useAuth';


const NavToggle = ({ expand, onChange }: any) => {
    return (
        <Navbar appearance="subtle" className="nav-toggle">
            <Navbar.Body>
                <Nav pullRight>
                    <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                        {expand ? <ArrowLeftLineIcon /> : <ArrowRightLineIcon />}
                    </Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
};

export default function ExplorePage() {
    const [expand, setExpand] = useState(false);
    const [active, setActive] = React.useState('1');

    // const {user, logout} = useAuth();

    const headerStyles: React.CSSProperties = {
        padding: 18,
        fontSize: 16,
        height: 56,
        background: '#34c3ff',
        color: ' #fff',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    };

    return(
        <Container>
            <Sidebar
                style={{ display: 'flex', flexDirection: 'column' }}
                width={expand ? 360 : 56}
                collapsible
            >
                <Sidenav.Header>
                    <div style={headerStyles}>
                        <LogoAnalytics style={{ fontSize: 20 }} />
                        <span style={{ marginLeft: 12 }}> Take place</span>
                    </div>
                </Sidenav.Header>
                <Sidenav expanded={expand} appearance="subtle">
                    <Sidenav.Body>
                        <Nav activeKey={active} onSelect={(eventKey) => {
                            setActive(eventKey)
                        }}>
                            <Nav.Item eventKey="1" icon={<Dashboard />}>
                                Dashboard
                            </Nav.Item>
                            <Nav.Item eventKey="2">
                                User Group
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    marginTop: 'auto'
                }}>
                    <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
                </div>
            </Sidebar>

            <ClickableMapComponent
                defaultCoord={{lat: 55.755793, lon: 37.617134}}
                handler={
                (point: GeoPoint) => {
                    alert(`${point.lat} ${point.lon}`)
                }
            }
                eventsPositions={[{lat: 55.755793, lon: 37.617134}, {lat: 55.7665309, lon: 37.767219543}, {lat: 55.6781651, lon: 37.84721374}]}
            />
        </Container>
    )
}
