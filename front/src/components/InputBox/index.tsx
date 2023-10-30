import React, { Dispatch, SetStateAction, KeyboardEvent } from 'react';
import { INPUT_ICON } from '../../constants';
import './style.css';

interface Props {
  label : string;
  labelError? : string; 
  type : string;
  placeholder : string;
  value : string;
  icon? : INPUT_ICON;
  helper? : string;
  error? : boolean;
  setValue : Dispatch<SetStateAction<string>>;
  buttonHandler? : () => void;
  keyDownHandler?: (event: KeyboardEvent<HTMLInputElement>) => void;
}


export default function InputBox({label,labelError,type,placeholder,value,icon,helper,error,setValue, buttonHandler, keyDownHandler}:Props) {
  
  const onChangeEventHandler = (value:string) => {
    setValue(value);
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(!keyDownHandler) return;
    keyDownHandler(event);
  }
  
  return (
   <div id='input-box'>
    <div className='input-box-label-container'>
      <div className='input-box-label'>{label}</div>
      {labelError ? 
        <div className='input-box-label-password-error'>{labelError}</div> : <></>
      }
    </div>
    <div className={error ? 'input-box-container-error' : 'input-box-container'}>
      <input className='input' type={type} placeholder={placeholder} value={value} onChange={(event) => onChangeEventHandler(event.target.value)} onKeyDown={onKeyDownHandler}/> 
      {
        icon && (
          <div className='input-box-icon' onClick={buttonHandler}>
          {
            icon === INPUT_ICON.ON ? (<div className='input-on-icon'></div>) :
            icon === INPUT_ICON.OFF ? (<div className='input-off-icon'></div>) : 
            icon === INPUT_ICON.ADDRESS ? (<div className='input-address-icon'></div>) : 
            (<></>) 
          }
          </div>
        )
      }
    </div>
    {helper &&
      <div className='input-box-helper'>{helper}</div>
    }
   </div>
  )
}