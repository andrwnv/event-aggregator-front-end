import React, { useState } from 'react';
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
    Uploader
} from 'rsuite';
import { CameraRetro } from '@rsuite/icons/es/icons/legacy';

import { Countries } from '../../countries';
import useAuth from '../../hooks/useAuth';

import './CreateObjModel.css';

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

export default function CreateObjModal(props: CreateObjModalProps) {
    const [uploading, setUploading] = useState(false);
    const [radioValue, setRadioValue] = useState('place')

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

    const SpecialInput = ({...props}) => <Input {...props} />;

    const uploadingHandler = () => {
        setUploading(true);

        setTimeout(() => {
            props.onClose();
            setTimeout(() => {
                setUploading(false);
                toaster.push(InfoMessage, {placement: 'bottomCenter'})
            }, 300) // !! await close animation end
        }, /*100000*/ 1000)
    }

    const ModalBody = () => (
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
                        Укажи диапазон проведения:
                        <DateRangePicker format="dd-MM-yyyy hh:mm" ranges={[]} style={{marginLeft: '15px'}}/>
                    </div>
                )}

                <Checkbox style={defaultMargin}>Необходима оплата</Checkbox>

                <InputPicker data={Countries} placeholder={'Выбери локацию'} style={defaultMargin}/>

                <SpecialInput size="lg" placeholder="Название" style={defaultMargin}/>
                <SpecialInput size="lg" as="textarea" placeholder="Описание" rows={8}
                              style={{...textareaStyle, ...defaultMargin}}/>

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
    );

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

                    {uploading ? <ModalBodyUpload/> : <ModalBody/>}

                    <Modal.Footer></Modal.Footer>
                </Modal.Header>
            </Modal>
        </FlexboxGrid>
    )
}
