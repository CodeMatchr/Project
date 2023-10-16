import React from 'react';
import './style.css';

export default function BoardPopUp() {
  return (
    <div id='board-popup-wrapper'>
      <div className='board-popup-top'></div>
      <div className='board-popup-bottom'>
        <div className='board-popup-text'>작성하시겠습니까?</div>
        <div className='board-popup-box'>
          <div className='board-popup-button-box'>
            <button className='board-popup-ok' />
            <button className='board-popup-cancel' />
          </div>
        </div>
      </div>
    </div>
  )
}