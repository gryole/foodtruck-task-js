import React from 'react';
import {Input} from 'antd';

interface NumericInputProps {
    style: React.CSSProperties;
    value: string;
    onChange: (value: string) => void;
    placeholder: string
}

const NumericInput = (props: NumericInputProps) => {
    const {value, onChange, placeholder} = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value: inputValue} = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            onChange(inputValue);
        }
    };

    // '.' at the end or only '-' in the input box.
    const handleBlur = () => {
        const strValue = '' + value;
        let valueTemp = strValue;
        if (strValue.charAt(strValue.length - 1) === '.' || strValue === '-') {
            valueTemp = strValue.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
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