import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'src/constants';

// component //
export default function Footer() {

    // state //
    const navigator = useNavigate();

    // function //

    // event handler //
    const onLogoButtonClickHandler = () => {
        navigator(MAIN_PATH);
    }

    // effect //

    // render //
    return (
        <div id='footer'>
            <div className='footer-box'>
                <div className='footer-left'>
                    <div className='footer-left-logo' onClick={onLogoButtonClickHandler} >
                        <div className='footer-left-logo-icon'></div>
                        <div className='footer-left-logo-text'>Code Matchr</div>
                    </div>
                    <div className='footer-left-copyright'>Copyright &copy; 2023 CopyMatchr. All Rights Reserved.</div>
                </div>
                <div className='footer-right'>
                    <div className='footer-right-github'>
                        <div className='footer-right-github-text'>About CodeMatchr's Code?</div>
                        <a className='footer-right-github-icon' href="https://github.com/CodeMatchr/Project" target='_blank' rel='noreferrer noopener'></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
