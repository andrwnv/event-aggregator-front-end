import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { Button, Container, Content, FlexboxGrid, Loader, Message, toaster, Uploader, Modal } from 'rsuite'
import {
    Icon,
    Check as CheckIcon,
    Exit as ExitIcon,
    Trash as TrashIcon,
    Setting as SettingIcon,
    IdMapping as IdMappingIcon, Paragraph, RemindOutline as RemindIcon
} from '@rsuite/icons'

import TakePlaceHeader from '../../components/custom-header/TakePlaceHeader'
import { templateURL_V1 } from '../../api/const'
import { UploadUserAvatar } from '../../api/upload.api'
import useAuth from '../../hooks/useAuth'

import './ProfilePage.css'

export default function ProfilePage() {
    let { user, me, logout } = useAuth()

    const [uploading, setUploading] = useState(false)
    const [avatarUploading, setAvatarUploading] = useState(false)
    const [fileInfo, setFileInfo] = useState(undefined)
    const [newAvatar, setNewAvatar] = useState<File | undefined>(undefined)
    const [settingModelOpen, setSettingModelOpen] = useState(false)
    const [deleteAlert, setDeleteAlertOpen] = useState(false)

    if (user === undefined)
        return <Navigate to='/' />

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
        if (newAvatar == undefined) {
            setAvatarUploading(false)
            return
        }

        const form = new FormData
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
        setSettingModelOpen(false)
    }

    const deleteAccountHandler = () => {
        logoutHandler()
    }

    return (
        <Container className={'main-page-root'}>
            <TakePlaceHeader />

            <Modal open={settingModelOpen} onClose={handlesSettingsClose}>
                <Modal.Header>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Paragraph />
                </Modal.Body>
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
                <Modal.Body style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
            </Modal>

            <Content>
                <FlexboxGrid justify='center' align='middle'>
                    <FlexboxGrid.Item colspan={20}>
                        <FlexboxGrid className={'profile-box'} align='middle' justify={'space-between'}>
                            <FlexboxGrid align='middle'>
                                <Uploader listType='picture' fileListVisible={false} action={''}
                                          onUpload={file => {
                                              setUploading(true)
                                              previewFile(file.blobFile, value => {
                                                  setFileInfo(value)
                                              })
                                          }}
                                          style={{ margin: '0 7px 7px 7px' }}>
                                    <button className={'avatar'} style={{
                                        height: '100px', width: '100px', border: 'none',
                                    }}>
                                        {uploading && <Loader backdrop center />}
                                        {fileInfo ? (
                                            <img src={fileInfo} width='100%' height='100%' alt={'avatar-preview'}
                                                 className={'avatar-img'} />
                                        ) : (
                                            user.photoURL === undefined
                                                ? <Icon as={IdMappingIcon} />
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
                                        <span className={'main-user-info'}>{user.secondName} {user.firstName}</span>
                                        {user.verified
                                            ? <Icon as={CheckIcon}
                                                    style={{ marginLeft: 7, color: 'green', fontSize: '1.5em' }} />
                                            : <></>}
                                    </div>
                                    <span className={'second-user-info'}>{user.email}</span>
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
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>
    )
}
