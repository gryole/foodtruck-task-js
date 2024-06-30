import React from 'react';
import {Input} from 'antd';

interface NumericInputProps {
    style: React.CSSProperties;
    value: number;
    onChange: (value: number) => void;
    placeholder: string
}

const NumericInput = (props: NumericInputProps) => {
    const {value, onChange, placeholder} = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value: inputValue} = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            let parsed = parseFloat(inputValue);
            if (isNaN(parsed)) {
                parsed = 0;
            }
            onChange(parsed);
        }
    };

    // '.' at the end or only '-' in the input box.
    const handleBlur = () => {
        const strValue = '' + value;
        let valueTemp = strValue;
        if (strValue.charAt(strValue.length - 1) === '.' || strValue === '-') {
            valueTemp = strValue.slice(0, -1);
        }
        onChange(parseFloat(valueTemp.replace(/0*(\d+)/, '$1')));
    };

    return (

        <Input
            {...props}
            size="large"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            maxLength={24}
        />
    );
};


export default NumericInput;