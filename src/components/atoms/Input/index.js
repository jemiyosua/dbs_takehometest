import React from 'react';
import './input.css';

function Input({label,required,labelSejajar, ...rest}) {
    return (
        <div className="input-wrapper">
            {label !="" && label !=null && 
            <p className="label">{label}{required && <span style={{color:'red'}}> *</span>}</p>
            }
            <input className="input" {...rest}/>
        </div>
    )
}

export default Input;
