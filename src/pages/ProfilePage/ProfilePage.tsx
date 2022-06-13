import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import {
    Button,
    Container,
    Content,
    FlexboxGrid,
    Loader,
    Message,
    toaster,
    Uploader,
    Modal,
    Pagination,
    Input, DatePicker,
} from 'rsuite'
import {
    Icon,
    Check as CheckIcon,
    Exit as ExitIcon,
    Trash as TrashIcon,
    Setting as SettingIcon,
    IdMapping as IdMappingIcon, RemindOutline as RemindIcon,
} from '@rsuite/icons'

import TakePlaceHeader from '../../components/custom-header/TakePlaceHeader'
import { templateURL_V1 } from '../../api/const'
import { UploadUserAvatar } from '../../api/upload.api'
import useAuth from '../../hooks/useAuth'

import './ProfilePage.css'
import { DeleteUser, UpdateUser } from '../../api/user.api'

function date2str(day: Date) {
    return `${day.getDate()}.${day.getMonth()}.${day.getFullYear()} г.`
}

export default function ProfilePage() {
    let { user, me, logout } = useAuth()

    const [uploading, setUploading] = useState(false)
    const [uploadingSettings, setUploadingSettings] = useState(false)
    const [deleteStatus, setDeleteStatus] = useState(false)

    const [avatarUploading, setAvatarUploading] = useState(false)
    const [fileInfo, setFileInfo] = useState(undefined)
    const [newAvatar, setNewAvatar] = useState<File | undefined>(undefined)
    const [settingModelOpen, setSettingModelOpen] = useState(false)
    const [deleteAlert, setDeleteAlertOpen] = useState(false)

    const [storyActivePage, setStoryActivePage] = useState(5)
    const [placeActivePage, setPlaceActivePage] = useState(5)
    const [eventActivePage, setEventActivePage] = useState(5)

    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [birthDay, setBirthDay] = useState<Date>(new Date())

    useEffect(() => {
        if (user !== undefined) {
            setFirstName(user.firstName)
            setSecondName(user.secondName)
            if (user.birthDay !== undefined)
                setBirthDay(user.birthDay)
        }
    }, [user])

    if (user === undefined) {
        return <Navigate to='/' />
    }

    const previewFile = (file: File | undefined, callback: (data: any) => void) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            callback(reader.result)
            setUploading(false)
        }
        if (file !== undefined) {
            reader.readAsDataURL(file)
            setNewAvatar(file)
        }
    }

    const avatarUploader = () => {
        setAvatarUploading(true)
        if (newAvatar === undefined) {
            setAvatarUploading(false)
            return
        }

        const form = new FormData()
        form.append('file', newAvatar)

        UploadUserAvatar(form).then(() => {
            setAvatarUploading(false)
            setFileInfo(undefined)
            setNewAvatar(undefined)

            me()
            setAvatarUploading(false)
        }).catch(() => {
            toaster.push(<Message type='error'>Не получилось сохранить аватар</Message>, { placement: 'bottomCenter' })
            setAvatarUploading(false)
        })
    }

    const logoutHandler = () => {
        logout()
    }

    const handlesSettingsClose = () => {
        setSettingModelOpen(false)
    }

    const handlesSettingsConfirm = () => {
        setUploadingSettings(true)

        UpdateUser({ firstName, secondName, birthDay, password: '' }).then(status => {
            if (!status) {
                toaster.push(<Message type='error'>Не удалось обновлены</Message>, { placement: 'bottomCenter' })
                setUploadingSettings(false)
                return
            }

            setSettingModelOpen(false)
            setTimeout(() => {
                setUploadingSettings(false)
                toaster.push(<Message type='info'>Данные успешно обновлены</Message>, { placement: 'bottomCenter' })
            }, 300) // !! await close animation end
            me()
        })
    }

    const deleteAccountHandler = () => {
        setDeleteStatus(true)
        DeleteUser().then(status => {
            if (!status) {
                toaster.push(<Message type='error'>Не удалось удалить! Мб в следующий раз :)</Message>, { placement: 'bottomCenter' })
                setDeleteStatus(false)
                setDeleteAlertOpen(false)
                return
            }

            setDeleteStatus(false)
            logoutHandler()
        })
    }

    const ModalBodyUpload = ({ title }: any) => (
        <FlexboxGrid align={'middle'} justify={'center'} style={{ marginTop: '20px' }}>
            <Modal.Body className={'adaptive_modal'}>
                <Loader size='lg' content={title} vertical />
            </Modal.Body>
        </FlexboxGrid>
    )

    return (
        <Container className={'main-page-root'}>
            <TakePlaceHeader />

            <Modal open={settingModelOpen} backdrop={false} onClose={handlesSettingsClose} className={'profile-settings-model'}>
                <Modal.Header>
                    <Modal.Title>Изменить личные данные</Modal.Title>
                </Modal.Header>
                {uploadingSettings ? <ModalBodyUpload title='Подожди, мы сохраняем данные' /> :
                    (
                        <Modal.Body>
                            <label>Имя</label>
                            <Input key='first_name' size='lg'
                                   onChange={setFirstName} value={firstName} style={{ marginBottom: '10px' }}
                            />
                            <label>Фамилия</label>
                            <Input key='second_name' size='lg'
                                   onChange={setSecondName} value={secondName} style={{ marginBottom: '10px' }}
                            />
                            <label>Дата рождения</label>
                            <DatePicker
                                ranges={[]}
                                format='dd-MM-yyyy'
                                defaultValue={birthDay}
                                onSelect={(value, _) => {
                                    setBirthDay(value)
                                }}
                            />
                        </Modal.Body>
                    )
                }
                <Modal.Footer>
                    <Button onClick={handlesSettingsConfirm} appearance='primary'>
                        Применить
                    </Button>
                    <Button onClick={handlesSettingsClose} appearance='subtle'>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal backdrop='static' role='alertdialog' open={deleteAlert} onClose={() => {
                setDeleteAlertOpen(false)
            }} size='xs'>

                {deleteStatus ? <ModalBodyUpload title='Прощай! Удаляем данные' /> :
                    (
                        <>
                            <Modal.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <RemindIcon
                                    style={{
                                        color: '#ffb300',
                                        fontSize: 24,
                                    }}
                                />
                                Вы действительно хотите удалить профиль?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={deleteAccountHandler} appearance='subtle' color={'red'}>
                                    Да
                                </Button>
                                <Button onClick={() => {
                                    setDeleteAlertOpen(false)
                                }} appearance='primary'>
                                    Нет, я случайно
                                </Button>
                            </Modal.Footer>
                        </>
                    )
                }
            </Modal>

            <Content>
                <FlexboxGrid justify='center' align='middle'>
                    <FlexboxGrid.Item colspan={20}>
                        <FlexboxGrid className={'profile-box'} align='middle' justify={'space-between'}>
                            <FlexboxGrid align='middle' className={'user-info'}>
                                <Uploader listType='picture' fileListVisible={false} action={''}
                                          onUpload={file => {
                                              setUploading(true)
                                              previewFile(file.blobFile, value => {
                                                  setFileInfo(value)
                                              })
                                          }}
                                          style={{ margin: '0 7px 7px 7px' }}>
                                    <button style={{
                                        height: '100px', width: '100px', border: 'none',
                                    }}>
                                        {uploading && <Loader backdrop center />}
                                        {fileInfo ? (
                                            <img src={fileInfo} width='100%' height='100%' alt={'avatar-preview'}
                                                 className={'avatar-img'} />
                                        ) : (
                                            user.photoURL === ''
                                                ?
                                                <Icon as={IdMappingIcon} style={{ fontSize: '2em', color: 'black' }} />
                                                :
                                                <img
                                                    src={`${templateURL_V1}/file/img/${user.photoURL}?uuid=${user.id}`}
                                                    alt={`@${user.email}`} className={'avatar-img'} width='100%'
                                                    height='100%' />
                                        )}
                                    </button>
                                </Uploader>
                                <div className={'short-user-info'}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span className={'main-user-info'}>{user.firstName} {user.secondName}</span>
                                        {user.verified
                                            ? <Icon as={CheckIcon}
                                                    style={{ marginLeft: 7, color: 'green', fontSize: '1.5em' }} />
                                            : <></>}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span className={'second-user-info'}>{user.email}</span>
                                        {user.birthDay !== undefined ? <span className={'second-user-info'} style={{paddingLeft: 15}}>{date2str(user.birthDay)}</span> : <></>}
                                    </div>

                                    {fileInfo
                                        ? <Button loading={avatarUploading} style={{ width: '60%' }}
                                                  onClick={avatarUploader}>
                                            Сохранить аватар
                                        </Button>
                                        : <></>
                                    }
                                </div>
                            </FlexboxGrid>
                            <FlexboxGrid align={'middle'} justify={'center'}>
                                <div className={'settings-item'} onClick={() => {
                                    setSettingModelOpen(true)
                                }}>
                                    Настроить
                                    <SettingIcon style={{ fontSize: '2em', paddingTop: 7 }} />
                                </div>
                                <div className={'settings-item'} onClick={() => setDeleteAlertOpen(true)}>
                                    Удалить
                                    <TrashIcon style={{ fontSize: '2em', paddingTop: 7 }} />
                                </div>
                                <div className={'settings-item'} onClick={logoutHandler}>
                                    Выйти
                                    <ExitIcon style={{ fontSize: '2em', paddingTop: 7 }} />
                                </div>
                            </FlexboxGrid>
                        </FlexboxGrid>

                        <h3 className={'block-title'}>Ваши истории</h3>
                        <FlexboxGrid justify='center' align='middle'>
                            <Pagination className={'paginationStyle'}
                                        prev
                                        last
                                        next
                                        first
                                        size='lg'
                                        total={100}
                                        limit={10} maxButtons={5}
                                        activePage={storyActivePage}
                                        onChangePage={setStoryActivePage}
                            />
                        </FlexboxGrid>

                        <h3 className={'block-title'}>Ваши события</h3>
                        <FlexboxGrid justify='center' align='middle'>
                            <Pagination className={'paginationStyle'}
                                        prev
                                        last
                                        next
                                        first
                                        size='lg'
                                        total={100}
                                        limit={10} maxButtons={5}
                                        activePage={eventActivePage}
                                        onChangePage={setEventActivePage}
                            />
                        </FlexboxGrid>

                        <h3 className={'block-title'}>Ваши места</h3>
                        <FlexboxGrid justify='center' align='middle'>
                            <Pagination className={'paginationStyle'}
                                        prev
                                        last
                                        next
                                        first
                                        size='lg'
                                        total={50}
                                        limit={5} maxButtons={5}
                                        activePage={placeActivePage}
                                        onChangePage={setPlaceActivePage}
                            />
                        </FlexboxGrid>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>
    )
}
