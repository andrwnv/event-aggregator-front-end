import React, { useEffect, useState } from 'react'
import { Container, FlexboxGrid, Pagination } from 'rsuite'

import TakePlaceHeader from '../../components/custom-header/TakePlaceHeader'
import HistoryCard from '../../components/history-card/HistoryCard'

import { GetHistoryList, ShortHistoryInfo } from '../../api/history.api'

import './HistoryListPage.css'

const HistoryListPage: React.FC<any> = () => {

    const [historyList, setHistoryList] = useState<ShortHistoryInfo[]>()
    const [activePage, setActivePage] = useState<number>(1)
    const [totalListSize, setTotalListSize] = useState<number>(1)

    useEffect(() => {
        GetHistoryList(activePage, 8).then(result => {
            if (result.totalSize == 1) {
                return
            }

            setTotalListSize(result.totalSize)
            setHistoryList(result.list)
        })
    }, [activePage])

    return (
        <Container className={'main-page-root'}>
            <TakePlaceHeader />

            <FlexboxGrid justify='center' align='middle' className={'adaptive-flex'}>
                <FlexboxGrid.Item
                    className={'history-root-box'}
                    colspan={20}
                >
                    {
                        historyList?.map(item => (
                            <HistoryCard
                                id={item.id}
                                title={item.title}
                                editable={false}
                                text={item.text}
                            />
                        ))
                    }
                </FlexboxGrid.Item>

                {
                    Math.floor(totalListSize / 8) > 1 && (
                        <Pagination className={'paginationStyle'}
                                    style={{ marginTop: '15px' }}
                                    prev
                                    last
                                    next
                                    first
                                    size='lg'
                                    total={totalListSize}
                                    limit={8}
                                    maxButtons={totalListSize}
                                    activePage={activePage}
                                    onChangePage={setActivePage}
                        />
                    )
                }
            </FlexboxGrid>
        </Container>
    )
}

export default HistoryListPage
