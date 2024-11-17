import React from 'react';
import Select from 'react-select';
import "./CustomSelect.css";

const CustomSelect = ({onChange, options, def}) => {

    const selecting = (selectedOption) => {
        onChange(selectedOption.value);
    }

    return (
        options.length > 0 &&
        <Select defaultValue={options[def]} onChange={selecting}
                options={options}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                formatOptionLabel={({label, image}) => (
                    image ? <img src={image} alt={label}/> : <label>{label}</label>
                )}
                className="react-select-container"
                classNamePrefix="react-select"
        />
    );
};

export default CustomSelect;