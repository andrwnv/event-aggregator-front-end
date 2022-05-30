import React, { useRef, useState } from 'react';

import './CustomInput.css';
import { FlexboxGrid } from 'rsuite';

type CustomInputProps = {
    key: number;
    value: string;
    isPassword?: boolean;
    placeholder: string;
    textRules: string;
    ruleHandler?: (value: string) => boolean;
    onChange: (newValue: string) => void;
};

export default function CustomInput(props: CustomInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [haveError, setErrorState] = useState(false);

    return (
        <FlexboxGrid
            key={props.key}
            className={(haveError ? "custom-input-container custom-input-container-error" : "custom-input-container")}
            onClick={(e: any) => {
                if (inputRef.current !== null) {
                    inputRef.current.focus();
                }
            }}
        >
            <input
                type={props.isPassword === true ? "password" : "text"}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => {
                    props.onChange(e.target.value);

                    if (props.ruleHandler !== undefined)
                        setErrorState(props.ruleHandler(e.target.value));
                }}
                className={"custom-input"}
                ref={inputRef}/>
            <div>{props.textRules}</div>
        </FlexboxGrid>
    );
}
