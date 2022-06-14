import React from 'react'
import { FlexboxGrid } from 'rsuite'

import './HistoryCard.css'
import { useNavigate } from 'react-router-dom'

type HistoryCard = {
    editable: boolean
    id: string
    title: string
    text: string
}

const HistoryCard: React.FC<HistoryCard> = ({ editable, id, title, text }) => {
    const navigate = useNavigate()

    return (
        <FlexboxGrid
            className={'history-card-root'}
            key={id}
        >
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                height: '23vh',
            }}>
                <h4
                    style={{ height: '20%', overflow: 'hidden', display: 'inline-block' }}
                >
                    {title}
                </h4>
                <div className={'event-card-second-text'}
                     style={{
                         fontSize: '1em',
                         height: '65%',
                         paddingBottom: 15,
                         marginBottom: '15px',
                         overflow: 'hidden',
                         display: 'inline-block',
                     }}>
                    {text}
                </div>
                <button
                    className={'event-card-button'}
                    style={{ height: '30%' }}
                    onClick={() => {
                        navigate(`/histories/${id}`)
                    }}
                >
                    Читать!
                </button>
            </div>
        </FlexboxGrid>
    )
}

export default HistoryCard
