import React from 'react';

import '../../fonts.css';
import './MiniProfile.css';

type MiniProfileInfo = {
    firstName: string;
    lastName: string;
    nickname: string;
    email: string;
    location: string;
    avatarLink: string;
    isGuest: boolean;
};

export default function MiniProfile(info: MiniProfileInfo) {
    return (
        <div className={"root-container-mini-profile vertical-container"}>
            <div
                className={"vertical-container center-container"}
                style={{marginRight: "2vh"}}
            >
                <img className={"avatar"} src={info.avatarLink} alt={`${info.nickname} avatar`}/>
            </div>

            <div
                className={"horizontal-container user-info-container center-container"}
                style={{minWidth: "35vh"}}
            >
                <div>
                    <div
                        style={{
                            fontSize: "2.5vh",
                        }}>
                        {info.lastName} {info.firstName} ({info.nickname})
                    </div>
                    <div style={{fontSize: "1.8vh"}}>
                        <div>{info.email}</div>
                        <div>{info.location}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

