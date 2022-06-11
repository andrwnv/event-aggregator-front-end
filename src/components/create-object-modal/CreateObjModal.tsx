import React, { useCallback, useState } from 'react'
import {
    Checkbox,
    DateRangePicker, FlexboxGrid,
    Form,
    Input,
    InputPicker,
    Loader, Message,
    Modal,
    Radio,
    RadioGroup, toaster,
    Uploader,
} from 'rsuite'
import { CameraRetro } from '@rsuite/icons/es/icons/legacy'

import { Countries } from '../../countries'

import './CreateObjModel.css'
import { CreateEventDTO, CreateObject, CreatePlaceDTO } from '../../api/object.api'
import { FileType } from 'rsuite/cjs/Uploader/Uploader'
import { ObjectType } from '../../api/const'
import { UploadObjectImg } from '../../api/upload.api'
import { GeoPoint } from '../../misc/GeoPoint'
import ClickableMapComponent from '../clickable-map/ClickableMap'

type CreateObjModalProps = {
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

type CityType = {
    coords: {
        lat: string,
        lon: string,
    },
    value: string,
    label: string
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

export default function CreateObjModal(props: CreateObjModalProps) {
    const [uploading, setUploading] = useState(false)

    const [radioValue, setRadioValue] = useState('place')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [city, setCity] = useState<CityType | undefined>(undefined)
    const [payment, setPayment] = useState(false)
    const [beginDate, setBeginDate] = useState<Date | undefined>(undefined)
    const [endDate, setEndDate] = useState<Date | undefined>(undefined)
    const [images, setImages] = useState<FileType[]>([])
    let [coords, setCoords] = useState<GeoPoint | undefined>()

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
            Не удалось загрузить объявление!
        </Message>
    )

    const uploadingHandler = () => {
        let info: CreateEventDTO | CreatePlaceDTO = {
            title: title,
            description: desc,
            payment_need: payment,
            longitude: coords!.lon,
            latitude: coords!.lat,
            region_id: city!.label,
        }
        if (radioValue === 'event') {
            info = {
                ...info,
                begin_date: Math.floor(beginDate!.getTime() / 1000),
                end_date: Math.floor(endDate!.getTime() / 1000),
            }
        }

        setUploading(true)

        CreateObject(info, radioValue as ObjectType).then(res => {
            const form = new FormData
            images.forEach(img => {
                if (img.blobFile !== undefined)
                    form.append('files', img.blobFile)
            })

            UploadObjectImg(form, res.data.result.id, radioValue as ObjectType).then(() => {
                props.onClose()
                setTimeout(() => {
                    setUploading(false)
                    toaster.push(InfoMessage, { placement: 'bottomCenter' })
                }, 300) // !! await close animation end
            }).catch(err => {
                console.log(err)
                props.onClose()
                setTimeout(() => {
                    setUploading(false)
                    toaster.push(ErrorMessage, { placement: 'bottomCenter' })
                }, 300) // !! await close animation end
            })
        }).catch(err => {
            console.log(err)
            props.onClose()
            setTimeout(() => {
                setUploading(false)
                toaster.push(ErrorMessage, { placement: 'bottomCenter' })
            }, 300) // !! await close animation end
        })
    }

    const ModalBodyUpload = () => (
        <FlexboxGrid align={'middle'} justify={'center'} style={{ marginTop: '20px' }}>
            <Modal.Body className={'adaptive_modal'}>
                <Loader size='lg' content='Подожди, мы сохраняем данные' vertical />
            </Modal.Body>
        </FlexboxGrid>
    )

    const MapComponent = useCallback(() => (
        <ClickableMapComponent
            defaultCoord={city === undefined ? { lat: 55.755793, lon: 37.617134 } : {
                lat: parseFloat(city.coords.lat),
                lon: parseFloat(city.coords.lon),
            }}
            selectedCoords={coords === undefined ?
                { lat: 55.755793, lon: 37.617134 } : { lat: coords.lat, lon: coords.lon }}
            handler={
                (point: GeoPoint) => {
                    alert(`${point.lat} ${point.lon}`)
                    coords = point
                    // setCoords(point)
                }
            }
            style={{
                height: '30vh',
                marginBottom: '2em',
            }}
        />
    ), [coords, city])

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
                    <Modal.Title>Создать новое объявление</Modal.Title>
                </Modal.Header>
                {uploading ? <ModalBodyUpload /> :
                    (
                        <Modal.Body style={{ minHeight: '70vh' }} className={'adaptive_modal'}>
                            <FlexboxGrid align={'middle'} justify={'center'}>
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
                            <FlexboxGrid align={'top'} justify={'start'} style={{
                                flexDirection: 'column',
                            }}>
                                <Form.Group controlId='radioList' style={defaultMargin}>
                                    <RadioGroup value={radioValue} name='radioList' onChange={(value, _) => {
                                        setRadioValue(value.toString())
                                    }}>
                                        <p>Выбери тип записи:</p>
                                        <Radio value={'event'}>Событие</Radio>
                                        <Radio value={'place'}>Место</Radio>
                                    </RadioGroup>
                                </Form.Group>

                                {radioValue === 'event' && (
                                    <div>
                                        Укажи даты проведения:
                                        <DateRangePicker format='dd-MM-yyyy hh:mm' style={{ marginLeft: '15px' }}
                                                         ranges={[]}
                                                         onOk={(value, _) => {
                                                             setBeginDate(value[0])
                                                             setEndDate(value[1])
                                                         }}
                                        />
                                    </div>
                                )}

                                <Checkbox style={defaultMargin}
                                          checked={payment}
                                          onChange={(value, checked) => {
                                              setPayment(checked)
                                          }}
                                >
                                    Необходима оплата
                                </Checkbox>

                                <InputPicker data={Countries} placeholder={'Выбери локацию'} style={defaultMargin}
                                             onSelect={(value: string, item, _) => {
                                                 setCity(item as CityType)
                                                 setCoords({
                                                     lat: parseFloat(item.coords.lat),
                                                     lon: parseFloat(item.coords.lon),
                                                 })
                                             }} value={city?.value}
                                />

                                <Input key='obj_title' size='lg' placeholder='Название' style={defaultMargin}
                                       onChange={setTitle}
                                />

                                <Input key='obj_desc' size='lg' as='textarea' placeholder='Описание' rows={8}
                                       style={{ ...textareaStyle, ...defaultMargin }}
                                       onChange={setDesc}
                                />

                                <MapComponent />

                                <button className={'reg-button-base'}
                                        style={{
                                            backgroundColor: '#141C22',
                                            color: '#D2D6D9',
                                            marginBottom: '2em',
                                            alignSelf: 'center',
                                        }} type='submit' onClick={uploadingHandler}>
                                    <div
                                        className={'second-font-size'}
                                        style={{
                                            paddingLeft: '2vw',
                                            paddingRight: '2vw',
                                        }}
                                    >
                                        Загрузить
                                    </div>
                                </button>
                            </FlexboxGrid>
                        </Modal.Body>
                    )
                }
                <Modal.Footer></Modal.Footer>
            </Modal>
        </FlexboxGrid>
    )
}
