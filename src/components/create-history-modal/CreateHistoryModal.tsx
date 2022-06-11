import React, { useState } from 'react'
import {
    FlexboxGrid,
    Input,
    Loader,
    Message,
    Modal,
    toaster,
    Uploader,
} from 'rsuite'
import { FileType } from 'rsuite/cjs/Uploader/Uploader'
import { CameraRetro } from '@rsuite/icons/es/icons/legacy'
import { CreateHistory, CreateHistoryDto, LinkedEvent, LinkedPlace } from '../../api/history.api'
import { UploadHistoryImg } from '../../api/upload.api'

type CreateHistoryModalProps = {
    show: boolean
    onClose: () => void
}

const defaultMargin: React.CSSProperties = {
    marginBottom: 10,
}

const textareaStyle: React.CSSProperties = {
    resize: 'none',
    overflow: 'auto',
}

function ext(path: string): string {
    const baseName = path.split(/[\\/]/).pop()
    if (baseName === undefined)
        return ''

    const pos = baseName.lastIndexOf('.')
    if (baseName === '' || pos < 1)
        return ''

    return baseName.slice(pos + 1)
}


export default function CreateHistoryModal(props: CreateHistoryModalProps) {
    const [uploading, setUploading] = useState(false)
    const [title, setTitle] = useState('')
    const [longText, setLongText] = useState('')
    const [images, setImages] = useState<FileType[]>([])

    const InfoMessage = (
        <Message showIcon type={'success'}>
            Успешно: Обявление создано
        </Message>
    )

    const AlertMessage = (
        <Message showIcon type={'info'}>
            Подожди немного, мы сохраняем данные
        </Message>
    )
    const ErrorMessage = (
        <Message showIcon type={'error'}>
            Не удалось создать историю :(
        </Message>
    )

    const ModalBodyUpload = () => (
        <FlexboxGrid align={'middle'} justify={'center'} style={{ marginTop: '20px' }}>
            <Modal.Body className={'adaptive_modal'}>
                <Loader size='lg' content='Подожди, мы сохраняем данные' vertical />
            </Modal.Body>
        </FlexboxGrid>
    )

    const shareHandler = () => {
        setUploading(true)

        CreateHistory({
            title: title,
            longReadText: longText,
            linkedPlaces: [],
            linkedEvents: [],
        }).then(res => {
            if (res === null) {
                toaster.push(ErrorMessage, { placement: 'bottomCenter' })
                setUploading(false)
                return
            }

            const form = new FormData
            images.forEach(img => {
                if (img.blobFile !== undefined)
                    form.append('files', img.blobFile)
            })

            UploadHistoryImg(form, res).then(() => {
                props.onClose()
                setTimeout(() => {
                    setUploading(false)
                    toaster.push(InfoMessage, { placement: 'bottomCenter' })
                }, 300) // !! await close animation end
            }).catch(() => {
                props.onClose()
                setTimeout(() => {
                    setUploading(false)
                    toaster.push(InfoMessage, { placement: 'bottomCenter' })
                }, 300) // !! await close animation end
            })
        }).catch(_ => {
            toaster.push(ErrorMessage, { placement: 'bottomCenter' })
            setUploading(false)
            return
        })
    }

    return (
        <FlexboxGrid className={'adaptive_modal'}>
            <Modal open={props.show} size={'lg'} onClose={() => {
                if (uploading) {
                    toaster.push(AlertMessage, { placement: 'bottomCenter' })
                    return
                }
                props.onClose()
            }} className={'adaptive_modal'}>
                <Modal.Header>
                    <Modal.Title>Создать историю</Modal.Title>
                </Modal.Header>

                {uploading ? <ModalBodyUpload /> :
                    (
                        <Modal.Body style={{ minHeight: '70vh' }} className={'adaptive_modal'}>
                            <FlexboxGrid align={'middle'} justify={'center'} style={{
                                flexDirection: 'column',
                            }}>
                                <Input key='obj_title' size='lg' placeholder='Заголовок' style={defaultMargin}
                                       onChange={setTitle}
                                />

                                <Input key='obj_desc' size='lg' as='textarea' placeholder='Место вашей истории...'
                                       rows={8}
                                       style={{ ...textareaStyle, ...defaultMargin }}
                                       onChange={setLongText}
                                />

                                <FlexboxGrid align={'middle'} justify={'center'} style={defaultMargin}>
                                    <Uploader multiple action={''} listType={'picture'} onChange={setImages}
                                              shouldUpload={file => {
                                                  const extList = ['png', 'jpg', 'jpeg']
                                                  if (file.name === undefined)
                                                      return false
                                                  return !extList.includes(ext(file.name))
                                              }}
                                    >
                                        <button>
                                            <CameraRetro />
                                        </button>
                                    </Uploader>
                                </FlexboxGrid>

                                <button className={'reg-button-base'}
                                        style={{
                                            backgroundColor: '#141C22',
                                            color: '#D2D6D9',
                                            marginBottom: '2em',
                                            alignSelf: 'center',
                                        }} type='submit' onClick={shareHandler}>
                                    <div
                                        className={'second-font-size'}
                                        style={{
                                            paddingLeft: '2vw',
                                            paddingRight: '2vw',
                                        }}
                                    >
                                        Поделиться
                                    </div>
                                </button>
                            </FlexboxGrid>
                        </Modal.Body>
                    )
                }
            </Modal>
        </FlexboxGrid>
    )
}
