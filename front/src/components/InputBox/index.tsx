import React, { Dispatch, SetStateAction } from 'react';
import './style.css';

interface Props {
  label : string;
  labelError? : string; 
  type : string;
  placeholder : string;
  value : string;
  icon? : string;
  helper? : string;
  error? : boolean;
  setValue : Dispatch<SetStateAction<string>>;
  buttonHandler? : () => void;
}


//             component            //
export default function InputBox({label,labelError,type,placeholder,value,icon,helper,error,setValue, buttonHandler}:Props) {
  
//             state            //
//             function            //
//             event handler            //
const onChangeEventHandler = (value:string) => {
  setValue(value);
}
//             component            //
//             effect            //

//             render            //
  return (
   <div id='input-box'>
    <div className='input-box-label-container'>
      <div className='input-box-label'>{label}</div>
      {labelError ? 
        <div className='input-box-label-password-error'>forgot password?</div> : <></>
      }
    </div>
    <div className={error ? 'input-box-container-error' : 'input-box-container'}>
      <input className='input' type={type} placeholder={placeholder} value={value} onChange={(event) => onChangeEventHandler(event.target.value)} /> 
      <div className='input-box-icon'></div>
    </div>
    {helper &&
      <div className='input-box-helper'>{helper}</div>
    }
   </div>
  )
}
