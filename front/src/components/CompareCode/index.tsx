import React, { useState, useRef } from 'react';

import './style.css';

// component //
export default function CompareCode() {

    // state //
    // Controll Group (왼쪽)
    const [leftText, setLeftText] = useState<string>('');
    // Experimental Group (오른쪽)
    const [rightText, setRightText] = useState<string>('');

    const [isCompare, setCompare] = useState<boolean>(false);

    // save 버튼 상태
    const [visibleSaveState, setVisibleSaveState] = useState<boolean>(false);

    

    // file input 요소에 대한 참조 상태 //
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 비교 분석 결과 정보를 저장할 상태

    // function //

    const handleLeftTextChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setLeftText(newText);
      }
  
      const handleRightTextChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setRightText(newText)
      }
  
      // 틀린 텍스의 배열의 index 번호를 찾는 함수
      const findDifferences = (left : string, right : string) : number[] => {
        const differences: number[] = [];
        const maxLength = Math.max(left.length, right.length);
        for(let i = 0; i < maxLength ; i++) {
          if(left[i] != right[i]) {
            console.log(left[i] + ' ' + right[i]);
              differences.push(i);
          }
        }
        return differences;
      }
  
      const differences = findDifferences(leftText, rightText);

    // event handler //
    const compareButtonClickHandler = () => {
      if(leftText.trim() === "" && rightText.trim() === "") {
        alert("텍스트를 입력해주세요.");
      } else if (leftText.trim() === "") {
        alert("기준이 되는 텍스트를 입력해주세요.");
      } else if (rightText.trim() === "") {
        alert("비교하려는 텍스트를 입력해 주세요.");
      } else if (leftText === rightText) {
        alert("두 텍스트들이 서로 일치합니다");
        setVisibleSaveState(true);
        setCompare(true);
      } else {
        alert("두 텍스트들이 서로 일치하지 않습니다.");
        setVisibleSaveState(true);
        setCompare(true);
      }
      
    }

    const resetButtonClickHandler = () => {
        setLeftText('');
        setRightText('');
        setVisibleSaveState(false);
        setCompare(false);
      }
  
      const switchButtonClickHandler = () => {
        setLeftText(rightText);
        setRightText(leftText);
      }

      const saveButtonCLickHandler = () => {
        alert("비교한 결과를 저장했습니다.");
      }

    // effect //

    // render //
    return (
      <div className='main-top'>
        <div className='main-top-title'>Compare Code</div>
        <div className='main-top-button-box'>
          <div className='main-top-reset-button' onClick={resetButtonClickHandler}>reset</div>
        </div> 
        <div className='main-top-compare'>
          <div className='main-top-compare-left'>
            <div className='main-top-compare-left-title'>Controll Code</div>
            <textarea 
              className='main-top-compare-left-input' 
              placeholder='텍스트를 입력하거나 파일을 업로드 해주세요. (기준 대상)' 
              value={leftText} 
              onChange={handleLeftTextChange}/>
          </div>
          <div className='main-top-compare-switch-button' onClick={switchButtonClickHandler}></div>
          <div className='main-top-compare-right'>
            <div className='main-top-compare-right-title'>Experimental Code</div>
            {isCompare ? (
            <div className='main-top-compare-right-input'>
            {rightText.split('').map((char, index) => (
              <span key={index} style={{backgroundColor : differences.includes(index) ? 'red' : 'none'}}>
                {char}
              </span>
            ))}
            </div>
            ) : (
            <textarea 
              className='main-top-compare-right-input' 
              placeholder='텍스트를 입력하거나 파일을 업로드 해주세요. (비교 대상)' 
              value={rightText} 
              onChange={handleRightTextChange}/>
            )}
          </div>
        </div>
        <div className='main-top-compare-box'>
          {visibleSaveState ? (
            <div className='main-top-compare-result-show'>
              <div className='main-top-compare-result-button' onClick={compareButtonClickHandler}>compare</div>
              <div className='main-top-compare-result-save-button' onClick={saveButtonCLickHandler}>save</div>
            </div>
          ) : (
            <div className='main-top-compare-result'>
              <div className='main-top-compare-result-button' onClick={compareButtonClickHandler}>compare</div>
            </div>
          )}
        </div>
      </div>
    )
}
