import React, { HTMLAttributes } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useColorMode } from '@chakra-ui/react';

import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';



const DatePicker = ({
                        selectedDate,
                        onChange,
                        isClearable = false,
                        showPopperArrow = false,
                        ...props
                    }) => {
    const isLight = useColorMode().colorMode==='light';
    const ExampleCustomTimeInput = ({ date, value, onChange }) => (
        <></>
    );
    return (
        <div className={isLight?"light-theme":"dark-theme"}>
            <ReactDatePicker
                selected={selectedDate}
                onChange={onChange}
                isClearable={isClearable}
                showPopperArrow={showPopperArrow}
                className="react-datapicker__input-text"
                {...props}
            />
        </div>
    );
};

export default DatePicker;