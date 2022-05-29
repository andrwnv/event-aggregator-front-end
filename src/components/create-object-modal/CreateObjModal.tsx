import React, { FormEvent, useState } from 'react';
import {
    Checkbox, CheckboxGroup,
    DateRangePicker, FlexboxGrid,
    Form,
    Input,
    InputPicker,
    Loader, Message,
    Modal,
    Radio,
    RadioGroup, toaster,
    Uploader
} from 'rsuite';
import { CameraRetro } from '@rsuite/icons/es/icons/legacy';

import { Countries } from '../../countries';
import useAuth from '../../hooks/useAuth';

import './CreateObjModel.css';
import { CreateEventDTO, CreateObject, CreatePlaceDTO, ObjectTypes } from '../../api/object.api';
import { PrependParameters } from 'rsuite/esm/@types/utils';
import { RangeType } from 'rsuite/DatePicker';

type CreateObjModalProps = {
    show: boolean
    onClose: () => void
}

const defaultMargin: React.CSSProperties = {
    marginBottom: 10
};

const textareaStyle: React.CSSProperties = {
    resize: 'none',
    overflow: 'auto'
}

type CityType = {
    coords: {
        lat: string,
        lon: string,
    },
    value: string,
    label: string
}

export default function CreateObjModal(props: CreateObjModalProps) {
    const [uploading, setUploading] = useState(false);

    const [radioValue, setRadioValue] = useState('place');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [city, setCity] = useState<CityType | undefined>(undefined);
    const [payment, setPayment] = useState(false);
    const [beginDate, setBeginDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    const {user} = useAuth();

    const InfoMessage = (
        <Message showIcon type={'success'}>
            Успешно: Обявление создано
        </Message>
    );

    const AlertMessage = (
        <Message showIcon type={'info'}>
            Подожди немного, мы сохраняем данные
        </Message>
    );

    const ErrorMessage = (
        <Message showIcon type={'error'}>
            Не удалось загрузить объявление!
        </Message>
    );

    const uploadingHandler = () => {
        console.log(typeof city!.coords.lon)

        let info: CreateEventDTO | CreatePlaceDTO = {
            title: title,
            description: desc,
            payment_required: payment,
            longitude: parseFloat(city!.coords.lon),
            latitude: parseFloat(city!.coords.lat),
            region_id: 'RU'
        }
        if (radioValue === 'event') {
            info = {
                ...info,
                begin_date: Math.floor(beginDate!.getTime() / 1000),
                end_date: Math.floor(endDate!.getTime() / 1000)
            }
        }

        console.log(info);

        setUploading(true);

        CreateObject(info, radioValue as ObjectTypes).then(() => {
            props.onClose();
            setTimeout(() => {
                setUploading(false);
                toaster.push(InfoMessage, {placement: 'bottomCenter'})
            }, 300) // !! await close animation end
        }).catch(err => {
            console.log(err)
            props.onClose();
            setTimeout(() => {
                setUploading(false);
                toaster.push(ErrorMessage, {placement: 'bottomCenter'})
            }, 300) // !! await close animation end
        });
    }

    const ModalBodyUpload = () => (
        <FlexboxGrid align={'middle'} justify={'center'} style={{marginTop: '20px'}}>
            <Modal.Body className={'adaptive_modal'}>
                <Loader size="lg" content="Подожди, мы сохраняем данные" vertical/>
            </Modal.Body>
        </FlexboxGrid>
    )

    return (
        <FlexboxGrid className={'adaptive_modal'}>
            <Modal open={props.show} size={'lg'} onClose={() => {
                if (uploading) {
                    toaster.push(AlertMessage, {placement: 'bottomCenter'});
                    return;
                }
                props.onClose();
            }} className={'adaptive_modal'}>
                <Modal.Header>
                    <Modal.Title>Создать новое объявление</Modal.Title>

                    {uploading ? <ModalBodyUpload/> :
                        (
                            <Modal.Body style={{minHeight: '70vh'}} className={'adaptive_modal'}>
                                <FlexboxGrid align={'middle'} justify={'center'}>
                                    <Uploader multiple action={''} listType={'picture'}>
                                        <button>
                                            <CameraRetro/>
                                        </button>
                                    </Uploader>
                                </FlexboxGrid>
                                <FlexboxGrid align={'top'} justify={'start'} style={{
                                    flexDirection: 'column'
                                }}>
                                    <Form.Group controlId="radioList" style={defaultMargin}>
                                        <RadioGroup value={radioValue} name="radioList" onChange={(value, _) => {
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
                                            <DateRangePicker format="dd-MM-yyyy hh:mm"  style={{marginLeft: '15px'}}
                                                             ranges={[]}
                                                             onOk={(value, event) => {
                                                                 setBeginDate(value[0])
                                                                 setEndDate(value[1])
                                                             }}
                                            />
                                        </div>
                                    )}

                                    <Checkbox style={defaultMargin}
                                              checked={payment}
                                              onChange={(value, checked) => {
                                                  setPayment(checked);
                                              }}
                                    >
                                        Необходима оплата
                                    </Checkbox>

                                    <InputPicker data={Countries} placeholder={'Выбери локацию'} style={defaultMargin}
                                                 onSelect={(value: string, item, event) => {
                                                     setCity(item as CityType);
                                                 }} value={city?.value}
                                    />

                                    <Input key = 'test1' size="lg" placeholder="Название" style={defaultMargin}
                                           onChange={(val: string) => {
                                               setTitle(val);
                                           }}
                                    />

                                    <Input key = 'test2' size="lg" as="textarea" placeholder="Описание" rows={8}
                                           style={{...textareaStyle, ...defaultMargin}}
                                           onChange={(v) => setDesc(v)}
                                    />

                                    <button className={"reg-button-base"}
                                            style={{
                                                backgroundColor: "#141C22",
                                                color: "#D2D6D9",
                                                marginBottom: '2em',
                                                alignSelf: 'center'
                                            }} type='submit' onClick={uploadingHandler}>
                                        <div
                                            className={"second-font-size"}
                                            style={{
                                                paddingLeft: "2vw",
                                                paddingRight: "2vw",
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
                </Modal.Header>
            </Modal>
        </FlexboxGrid>
    )
}
