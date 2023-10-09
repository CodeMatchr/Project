import React from 'react';
import './style.css';

// component //
export default function Footer() {

    // state //

    // function //

    // event handler //

    // effect //

    // render //
    return (
        <div id='footer'>
            <div className='footer-left'>
                <div className='footer-left-logo'>
                    <div className='footer-left-logo-icon'>logo</div>
                    <div className='footer-left-logo-text'>Code Matchr</div>
                </div>
                <div className='footer-left-copyright'>Copyright &copy; 2023 CopyMatchr. All Rights Reserved.</div>
            </div>
            <div className='footer-right'>
                <div className='footer-right-github'>
                    <div className='footer-right-github-text'>About CodeMatchr's Code?</div>
                    <a className='footer-right-github-icon' href="https://github.com/CodeMatchr/Project">github</a>
                </div>
            </div>
        </div>
    )
}
